import { RequestHook } from 'testcafe';

class HeaderBypassAutorization extends RequestHook {
  constructor() {
    super();
  }
  onRequest(e) {
    e.requestOptions.headers['x-rp-fwbypass'] = 'true';
    e.requestOptions.headers['domain'] = '.rent.com';
  }
  onResponse(e) {
    // This method must also be overridden, but you can leave it blank.
  }

}
export default new HeaderBypassAutorization();
