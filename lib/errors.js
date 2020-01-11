/* eslint-disable max-classes-per-file */

class CustomError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
  }
}

class FileError extends CustomError {}

class UnknownError extends CustomError {}

class HTTPError extends CustomError {
  constructor(msg, code) {
    if (code === null) {
      super(msg);
    } else {
      super(`[HTTP ${code}]${msg}`);
    }
  }
}

class ClientError extends HTTPError {
  constructor(msg, code = '4xx') {
    super(msg, code);
  }
}

class ServerError extends HTTPError {
  constructor(msg, code = '5xx') {
    super(msg, code);
  }
}

class NotFoundError extends ClientError {}
class ChannelNotFoundError extends ClientError {}

class AuthError extends ClientError {}

module.exports = {
  CustomError,
  HTTPError,
  ServerError,
  ClientError,
  NotFoundError,
  ChannelNotFoundError,
  AuthError,
  FileError,
  UnknownError,
};
