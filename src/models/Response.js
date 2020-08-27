class Response {
  constructor(error_no, data, message) {
    this.error_no = error_no;

    if (data) {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}

class Success extends Response {
  constructor(data) {
    super(0);
    if (data) {
      this.data = data;
    }
  }
}

class Fail extends Response {
  constructor(error_no = 1, message) {
    super(error_no);
    if (message) {
      this.message = message;
    }
  }
}

module.exports = {
  Success,
  Fail,
};
