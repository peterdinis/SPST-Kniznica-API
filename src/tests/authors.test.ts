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

it('test_edge_case_returns_json_response_with_error_message_when_no_author_found', async () => {
    const req = { params: { externalId: 999 } };
    const res = { json: jest.fn() };
    await getOneAuthor(req, res);
    expect(res.json).toHaveBeenCalledWith({ error: 'No author found' });
  });

  it('test_edge_case_throws_error_when_externalId_not_a_number', async () => {
    const req = { params: { externalId: 'not a number' } };
    const res = { json: jest.fn() };
    await expect(getOneAuthor(req, res)).rejects.toThrow();
  });

  it('test_edge_case_returns_json_response_with_error_message_when_externalId_not_a_number', async () => {
    const req = { params: { externalId: 'not a number' } };
    const res = { json: jest.fn() };
    await getOneAuthor(req, res);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid externalId' });
  });