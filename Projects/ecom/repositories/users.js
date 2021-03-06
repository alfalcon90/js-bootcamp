const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRespository extends Repository {
  async create(attrs) {
    attrs.id = this.randomID();

    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    // Saved -> password saved in our database. 'hashed.salt'
    // Supplied -> password given to use by user during sign in

    // const result = saved.split('.');
    // const hashed = result[0];
    // const salt = result[1];

    // Same as above with one line
    const [hashed, salt] = saved.split('.');

    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString('hex');
  }
}

module.exports = new UsersRespository('users.json');
