import { Entity, PrimaryColumn, Column, Index, ManyToOne } from "typeorm";
import { randomBytes } from 'crypto'
import { Account } from "./Account";

function generateToken({ stringBase = 'base64', byteLength = 64 } = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString(stringBase));
      }
    });
  });
}


@Entity()
export class RefreshToken {
  @PrimaryColumn()
  id!: number;

  @Column()
  @Index()
  token!: string;

  @ManyToOne(() => Account)
  account!: Account;

  async update() {
    this.token = await generateToken();
  }
}

export async function createRefreshToken(acc: Account) {
  const r = new RefreshToken();
  r.update();
  r.account = acc;
  return r;
}
