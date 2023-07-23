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


it('test_happy_path_valid_page_limit', async () => {
    const req = { query: { page: 1, limit: 10 } } as Request;
    const res = { json: jest.fn() } as unknown as Response;
    await findAllPaginatedAuthors(req, res);
    expect(res.json).toHaveBeenCalled();
  });


  it('test_empty_array_no_authors_found', async () => {
    const req = { query: { page: 1, limit: 10 } } as Request;
    const res = { json: jest.fn() } as unknown as Response;
    paginate.author.paginate = jest.fn().mockResolvedValueOnce([]);
    await findAllPaginatedAuthors(req, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });


  it('test_edge_case_invalid_page_limit', async () => {
    const req = { query: { page: -1, limit: 0 } } as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const expectedErrorMessage = 'Invalid page or limit';
    try {
      await findAllPaginatedAuthors(req, res);
    } catch (err) {
      expect(getErrorMessage(err)).toEqual(expectedErrorMessage);
    }
  });