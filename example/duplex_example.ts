import { Duplex } from '..';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
let rs = createReadStream(join(__dirname, 'source.txt'));
let ws = createWriteStream(join(__dirname, 'target.txt'));
let ts = new Duplex(null, 1000);

rs.pipe(ts)
ts.pipe(ws);
