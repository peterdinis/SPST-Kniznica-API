it("test_get_all_authors_success", async () => {
  const req = {} as Request;
  const res = {
    json: jest.fn().mockReturnValue([]),
  } as unknown as Response;

  await getAllAuthors(req, res);

  expect(res.json).toHaveBeenCalledWith([]);
});

it("test_get_all_authors_empty", async () => {
  const req = {} as Request;
  const res = {
    json: jest.fn().mockReturnValue([]),
  } as unknown as Response;

  await getAllAuthors(req, res);

  expect(res.json).toHaveBeenCalledWith([]);
});

it("test_get_all_authors_error", async () => {
  const req = {} as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;

  const errorMessage = "Database error";
  jest
    .spyOn(db.author, "findMany")
    .mockRejectedValueOnce(new Error(errorMessage));

  await getAllAuthors(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith(errorMessage);
});

it("test_get_all_authors_json_structure", async () => {
  const req = {} as Request;
  const res = {
    json: jest.fn().mockReturnValue([]),
  } as unknown as Response;

  await getAllAuthors(req, res);

  expect(res.json).toHaveBeenCalledWith(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        books: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            authorId: expect.any(Number),
          }),
        ]),
      }),
    ])
  );
});

it("test_get_all_authors_status_code_success", async () => {
  const req = {} as Request;
  const res = {
    json: jest.fn().mockReturnValue([]),
  } as unknown as Response;

  await getAllAuthors(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
});

it("test_get_all_authors_status_code_error", async () => {
  const req = {} as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;

  const errorMessage = "Database error";
  jest
    .spyOn(db.author, "findMany")
    .mockRejectedValueOnce(new Error(errorMessage));

  await getAllAuthors(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

it("test_happy_path_valid_page_limit", async () => {
  const req = { query: { page: 1, limit: 10 } } as Request;
  const res = { json: jest.fn() } as unknown as Response;
  await findAllPaginatedAuthors(req, res);
  expect(res.json).toHaveBeenCalled();
});

it("test_empty_array_no_authors_found", async () => {
  const req = { query: { page: 1, limit: 10 } } as Request;
  const res = { json: jest.fn() } as unknown as Response;
  paginate.author.paginate = jest.fn().mockResolvedValueOnce([]);
  await findAllPaginatedAuthors(req, res);
  expect(res.json).toHaveBeenCalledWith([]);
});

it("test_edge_case_invalid_page_limit", async () => {
  const req = { query: { page: -1, limit: 0 } } as Request;
  const res = { json: jest.fn() } as unknown as Response;
  const expectedErrorMessage = "Invalid page or limit";
  try {
    await findAllPaginatedAuthors(req, res);
  } catch (err) {
    expect(getErrorMessage(err)).toEqual(expectedErrorMessage);
  }
});

it("test_edge_case_error_fetching_authors", async () => {
  const req = { query: { page: 1, limit: 10 } } as Request;
  const res = { json: jest.fn() } as unknown as Response;
  const expectedErrorMessage = "Error fetching authors";
  paginate.author.paginate = jest
    .fn()
    .mockRejectedValueOnce(new Error(expectedErrorMessage));
  try {
    await findAllPaginatedAuthors(req, res);
  } catch (err) {
    expect(getErrorMessage(err)).toEqual(expectedErrorMessage);
  }
});

it("test_general_behaviour_correct_page_limit", async () => {
  const req = { query: { page: 1, limit: 10 } } as Request;
  const res = { json: jest.fn() } as unknown as Response;
  await findAllPaginatedAuthors(req, res);
  expect(res.json).toHaveBeenCalled();
});

it("test_general_behaviour_sorted_authors", async () => {
  const req = { query: { page: 1, limit: 10 } } as Request;
  const res = { json: jest.fn() } as unknown as Response;
  const expectedAuthors = [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
  ];
  paginate.author.paginate = jest.fn().mockResolvedValueOnce(expectedAuthors);
  await findAllPaginatedAuthors(req, res);
  expect(res.json).toHaveBeenCalledWith(expectedAuthors);
});

it("test_happy_path_returns_author_with_books", async () => {
  const req = { params: { externalId: 1 } };
  const res = { json: jest.fn() };
  await getOneAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith({
    id: expect.any(Number),
    name: expect.any(String),
    books: [
      {
        id: expect.any(Number),
        title: expect.any(String),
        authorId: expect.any(Number),
      },
    ],
  });
});

it("test_happy_path_returns_json_response_with_author_with_books", async () => {
  const req = { params: { externalId: 1 } };
  const res = { json: jest.fn() };
  await getOneAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith({
    id: expect.any(Number),
    name: expect.any(String),
    books: [
      {
        id: expect.any(Number),
        title: expect.any(String),
        authorId: expect.any(Number),
      },
    ],
  });
});

it("test_edge_case_throws_error_when_no_author_found", async () => {
  const req = { params: { externalId: 999 } };
  const res = { json: jest.fn() };
  await expect(getOneAuthor(req, res)).rejects.toThrow("No author found");
});

it("test_edge_case_returns_json_response_with_error_message_when_no_author_found", async () => {
  const req = { params: { externalId: 999 } };
  const res = { json: jest.fn() };
  await getOneAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith({ error: "No author found" });
});

it("test_edge_case_throws_error_when_externalId_not_a_number", async () => {
  const req = { params: { externalId: "not a number" } };
  const res = { json: jest.fn() };
  await expect(getOneAuthor(req, res)).rejects.toThrow();
});

it("test_edge_case_returns_json_response_with_error_message_when_externalId_not_a_number", async () => {
  const req = { params: { externalId: "not a number" } };
  const res = { json: jest.fn() };
  await getOneAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith({ error: "Invalid externalId" });
});

it("returns an array of authors when the search query matches a name", async () => {
  const req = { query: { q: "John" } };
  const res = { json: jest.fn() };
  await searchForAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith(
    expect.arrayContaining([expect.objectContaining({ name: "John" })])
  );
});

it("returns a 200 status code when authors are found", async () => {
  const req = { query: { q: "John" } };
  const res = { json: jest.fn() };
  await searchForAuthor(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
});

it("returns a 404 status code when no authors are found", async () => {
  const req = { query: { q: "Nonexistent" } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  await searchForAuthor(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith("Authors not found");
});

it("returns an empty array when the search query does not match any names", async () => {
  const req = { query: { q: "Nonexistent" } };
  const res = { json: jest.fn() };
  await searchForAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith([]);
});

it("returns an error message when an error occurs during the search", async () => {
  const req = { query: { q: "John" } };
  const res = { json: jest.fn() };
  const errorMessage = "Error message";
  jest.spyOn(db.author, "findMany").mockRejectedValueOnce(errorMessage);
  await searchForAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith(errorMessage);
});

it("uses the contains operator to search for partial matches", async () => {
  const req = { query: { q: "Jo" } };
  const res = { json: jest.fn() };
  await searchForAuthor(req, res);
  expect(db.author.findMany).toHaveBeenCalledWith({
    where: { name: { contains: "Jo" } },
  });
});

it("test_create_author_valid_data", async () => {
  const req = { body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  await createAuthor(req, res);
  expect(res.json).toHaveBeenCalled();
});

it("test_create_author_return_author", async () => {
  const req = { body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  await createAuthor(req, res);
  expect(res.json.mock.calls[0][0]).toHaveProperty("id");
  expect(res.json.mock.calls[0][0]).toHaveProperty("name", "John Doe");
});

it("test_create_author_error_author_creation", async () => {
  const req = { body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.author.create = jest
    .fn()
    .mockRejectedValue(new Error("Failed to create author"));
  await createAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith({ error: "Failed to create author" });
});

it("test_create_author_error_notification_creation", async () => {
  const req = { body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.notification.create = jest
    .fn()
    .mockRejectedValue(new Error("Failed to create notification"));
  await createAuthor(req, res);
  expect(res.json).toHaveBeenCalledWith({
    error: "Failed to create notification",
  });
});

it("test_create_author_emit_notification", async () => {
  const req = { body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  io.emit = jest.fn();
  await createAuthor(req, res);
  expect(io.emit).toHaveBeenCalledWith("newNotification", expect.any(Object));
});

it("test_create_author_data_structure", async () => {
  const req = { body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  await createAuthor(req, res);
  expect(res.json.mock.calls[0][0]).toHaveProperty("id");
  expect(res.json.mock.calls[0][0]).toHaveProperty("name", "John Doe");
  expect(res.json.mock.calls[0][0]).toHaveProperty("externalId");
});

it("test_update_author_success", async () => {
  const req = { params: { id: 1 }, body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.author.update = jest.fn().mockResolvedValue({ id: 1, name: "John Doe" });
  db.notification.create = jest
    .fn()
    .mockResolvedValue({ message: "Upravený autor - 1" });
  io.emit = jest.fn();

  await updateAuthor(req, res);

  expect(db.author.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: { name: "John Doe" },
  });
  expect(db.notification.create).toHaveBeenCalledWith({
    data: { message: "Upravený autor - 1" },
  });
  expect(io.emit).toHaveBeenCalledWith("newNotification", {
    message: "Upravený autor - 1",
  });
  expect(res.json).toHaveBeenCalledWith({ id: 1, name: "John Doe" });
});

it("test_update_author_no_author_found", async () => {
  const req = { params: { id: 1 }, body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.author.update = jest.fn().mockResolvedValue(null);

  try {
    await updateAuthor(req, res);
  } catch (err) {
    expect(err.message).toBe("No author found");
  }
});

it("test_update_author_prisma_error", async () => {
  const req = { params: { id: 1 }, body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.author.update = jest
    .fn()
    .mockRejectedValue(new Error("PrismaClient error"));

  try {
    await updateAuthor(req, res);
  } catch (err) {
    expect(err.message).toBe("PrismaClient error");
  }
});

it("test_update_author_notification_emitted", async () => {
  const req = { params: { id: 1 }, body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.author.update = jest.fn().mockResolvedValue({ id: 1, name: "John Doe" });
  db.notification.create = jest
    .fn()
    .mockResolvedValue({ message: "Upravený autor - 1" });
  io.emit = jest.fn();

  await updateAuthor(req, res);

  expect(io.emit).toHaveBeenCalledWith("newNotification", {
    message: "Upravený autor - 1",
  });
});

it("test_update_author_error_handling", async () => {
  const req = { params: { id: 1 }, body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.author.update = jest
    .fn()
    .mockRejectedValue(new Error("PrismaClient error"));
  getErrorMessage = jest.fn();

  await updateAuthor(req, res);

  expect(getErrorMessage).toHaveBeenCalledWith(new Error("PrismaClient error"));
});

it("test_update_author_returns_json", async () => {
  const req = { params: { id: 1 }, body: { name: "John Doe" } };
  const res = { json: jest.fn() };
  db.author.update = jest.fn().mockResolvedValue({ id: 1, name: "John Doe" });
  db.notification.create = jest
    .fn()
    .mockResolvedValue({ message: "Upravený autor - 1" });
  io.emit = jest.fn();

  await updateAuthor(req, res);

  expect(res.json).toHaveBeenCalledWith({ id: 1, name: "John Doe" });
});

it("test_delete_author_successfully", async () => {
  const req = { params: { id: 1 } };
  const res = { json: jest.fn() };
  const authorForDelete = { id: 1, name: "John Doe" };
  db.author.delete = jest.fn().mockResolvedValueOnce(authorForDelete);
  db.notification.create = jest
    .fn()
    .mockResolvedValueOnce({ message: `Zmazaný autor - ${req.params.id}` });
  io.emit = jest.fn();

  await deleteAuthor(req, res);

  expect(db.author.delete).toHaveBeenCalledWith({
    where: { id: Number(req.params.id) },
  });
  expect(db.notification.create).toHaveBeenCalledWith({
    data: { message: `Zmazaný autor - ${req.params.id}` },
  });
  expect(io.emit).toHaveBeenCalledWith("newNotification", {
    message: `Zmazaný autor - ${req.params.id}`,
  });
  expect(res.json).toHaveBeenCalledWith(authorForDelete);
});

it("test_create_notification_successfully", async () => {
  const req = { params: { id: 1 } };
  const res = { json: jest.fn() };
  const authorForDelete = { id: 1, name: "John Doe" };
  db.author.delete = jest.fn().mockResolvedValueOnce(authorForDelete);
  db.notification.create = jest
    .fn()
    .mockResolvedValueOnce({ message: `Zmazaný autor - ${req.params.id}` });
  io.emit = jest.fn();

  await deleteAuthor(req, res);

  expect(db.author.delete).toHaveBeenCalledWith({
    where: { id: Number(req.params.id) },
  });
  expect(db.notification.create).toHaveBeenCalledWith({
    data: { message: `Zmazaný autor - ${req.params.id}` },
  });
  expect(io.emit).toHaveBeenCalledWith("newNotification", {
    message: `Zmazaný autor - ${req.params.id}`,
  });
  expect(res.json).toHaveBeenCalledWith(authorForDelete);
});

it("test_emit_new_notification_successfully", async () => {
  const req = { params: { id: 1 } };
  const res = { json: jest.fn() };
  const authorForDelete = { id: 1, name: "John Doe" };
  db.author.delete = jest.fn().mockResolvedValueOnce(authorForDelete);
  db.notification.create = jest
    .fn()
    .mockResolvedValueOnce({ message: `Zmazaný autor - ${req.params.id}` });
  io.emit = jest.fn();

  await deleteAuthor(req, res);

  expect(db.author.delete).toHaveBeenCalledWith({
    where: { id: Number(req.params.id) },
  });
  expect(db.notification.create).toHaveBeenCalledWith({
    data: { message: `Zmazaný autor - ${req.params.id}` },
  });
  expect(io.emit).toHaveBeenCalledWith("newNotification", {
    message: `Zmazaný autor - ${req.params.id}`,
  });
  expect(res.json).toHaveBeenCalledWith(authorForDelete);
});

it("test_throw_error_if_author_not_found", async () => {
  const req = { params: { id: 1 } };
  const res = { json: jest.fn() };
  db.author.delete = jest.fn().mockResolvedValueOnce(null);

  try {
    await deleteAuthor(req, res);
  } catch (err) {
    expect(err.message).toBe("Author not found");
  }
});

it("test_handles_errors_thrown_by_get_error_message", async () => {
  const req = { params: { id: 1 } };
  const res = { json: jest.fn() };
  db.author.delete = jest
    .fn()
    .mockRejectedValueOnce(new Error("Database error"));
  getErrorMessage = jest.fn().mockReturnValueOnce("Error message");

  await deleteAuthor(req, res);

  expect(getErrorMessage).toHaveBeenCalledWith(new Error("Database error"));
});

it("test_calls_db_author_delete_with_correct_parameters", async () => {
  const req = { params: { id: 1 } };
  const res = { json: jest.fn() };
  db.author.delete = jest.fn().mockResolvedValueOnce(null);

  try {
    await deleteAuthor(req, res);
  } catch (err) {
    expect(db.author.delete).toHaveBeenCalledWith({
      where: { id: Number(req.params.id) },
    });
  }
});
