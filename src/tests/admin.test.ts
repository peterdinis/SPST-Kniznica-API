import { registerAdmin } from "../controllers/adminController";
import { createAdminRegisterType } from "../validators/adminSchema";

it("test_happy_path_create_admin", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "password",
    },
  } as any; // as Request<{}, {}, createAdminRegisterType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  await registerAdmin(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
});

it("test_edge_case_admin_already_exists", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "password",
    },
  } as Request<{}, {}, createAdminRegisterType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as Response;

  db.admin.findFirst = jest.fn().mockResolvedValue({});

  await registerAdmin(req, res);

  expect(res.status).toHaveBeenCalledWith(409);
  expect(res.send).toHaveBeenCalledWith("Admin already exists");
});

it("test_edge_case_password_length_less_than_4", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "123",
    },
  } as Request<{}, {}, createAdminRegisterType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as Response;

  await registerAdmin(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith(
    "Password must be at least 4 characters"
  );
});

it("test_general_behaviour_use_bcrypt", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "password",
    },
  } as Request<{}, {}, createAdminRegisterType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  bcrypt.genSalt = jest.fn().mockResolvedValue("salt");
  bcrypt.hash = jest.fn().mockResolvedValue("hash");

  await registerAdmin(req, res);

  expect(bcrypt.genSalt).toHaveBeenCalled();
  expect(bcrypt.hash).toHaveBeenCalled();
});

it("test_happy_path_valid_email_password", async () => {
  const req = {
    body: {
      email: "admin@example.com",
      password: "password",
    },
  } as Request<{}, {}, createAdminLoginType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const admin = {
    id: 1,
    email: "admin@example.com",
    password: await bcrypt.hash("password", 10),
  };

  db.admin.findFirst = jest.fn().mockResolvedValueOnce(admin);
  jwt.sign = jest.fn().mockReturnValueOnce("token");

  await loginAdmin(req, res);

  expect(db.admin.findFirst).toHaveBeenCalledWith({
    where: { email: "admin@example.com" },
  });
  expect(bcrypt.compare).toHaveBeenCalledWith("password", admin.password);
  expect(jwt.sign).toHaveBeenCalledWith(
    { id: admin.id },
    process.env.JWT_SECRET
  );
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ admin, token: "token" });
});

it("test_happy_path_valid_email_password_calls_jwt_sign", async () => {
  const req = {
    body: {
      email: "admin@example.com",
      password: "password",
    },
  } as Request<{}, {}, createAdminLoginType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const admin = {
    id: 1,
    email: "admin@example.com",
    password: await bcrypt.hash("password", 10),
  };

  db.admin.findFirst = jest.fn().mockResolvedValueOnce(admin);
  jwt.sign = jest.fn().mockReturnValueOnce("token");

  await loginAdmin(req, res);

  expect(jwt.sign).toHaveBeenCalledWith(
    { id: admin.id },
    process.env.JWT_SECRET
  );
});

it("test_edge_case_invalid_email", async () => {
  const req = {
    body: {
      email: "admin@example.com",
      password: "password",
    },
  } as Request<{}, {}, createAdminLoginType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  db.admin.findFirst = jest.fn().mockResolvedValueOnce(null);

  await loginAdmin(req, res);

  expect(db.admin.findFirst).toHaveBeenCalledWith({
    where: { email: "admin@example.com" },
  });
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ message: "Admin does not exist" });
});

it("test_edge_case_invalid_password", async () => {
  const req = {
    body: {
      email: "admin@example.com",
      password: "password",
    },
  } as Request<{}, {}, createAdminLoginType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const admin = {
    id: 1,
    email: "admin@example.com",
    password: await bcrypt.hash("password", 10),
  };

  db.admin.findFirst = jest.fn().mockResolvedValueOnce(admin);
  bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

  await loginAdmin(req, res);

  expect(bcrypt.compare).toHaveBeenCalledWith("password", admin.password);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ msg: "Password does not match. " });
});

it("test_edge_case_admin_not_found", async () => {
  const req = {
    body: {
      email: "admin@example.com",
      password: "password",
    },
  } as Request<{}, {}, createAdminLoginType>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  db.admin.findFirst = jest.fn().mockResolvedValueOnce(null);

  await loginAdmin(req, res);

  expect(db.admin.findFirst).toHaveBeenCalledWith({
    where: { email: "admin@example.com" },
  });
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ message: "Admin does not exist" });
});

it("test_returns_user_object", async () => {
  const req = { params: { id: 1 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  await adminProfile(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ id: 1 });
});

it("test_throws_error_if_id_not_number", async () => {
  const req = { params: { id: "not a number" } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  await expect(adminProfile(req, res)).rejects.toThrow();
});

it("test_throws_error_if_id_not_provided", async () => {
  const req = { params: {} };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  await expect(adminProfile(req, res)).rejects.toThrow();
});

it("test_throws_error_if_user_not_found", async () => {
  const req = { params: { id: 2 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  await expect(adminProfile(req, res)).rejects.toThrow();
});

it("test_returns_empty_object_if_user_not_found", async () => {
  const req = { params: { id: 2 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  await adminProfile(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({});
});

it("test_returns_correct_user_object_based_on_id", async () => {
  const req = { params: { id: 1 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  await adminProfile(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ id: 1 });
});
