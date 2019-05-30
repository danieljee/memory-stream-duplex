import { Transform } from '..';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
let rs = createReadStream(join(__dirname, 'source.txt'));
let ws = createWriteStream(join(__dirname, 'target.txt'));
let ts = new Transform(null, (chunk) => {
    if (!chunk) return chunk;
    return (chunk instanceof Buffer ? chunk.toString('utf8') : chunk)
    .split(' ').join(';');
})

rs.pipe(ts)
ts.pipe(ws);
