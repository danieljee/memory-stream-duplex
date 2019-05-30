import { Duplex, DuplexOptions } from 'stream';

export default function DuplexMemoryStream(options: DuplexOptions, timeout?: number): void{
    if (!(this instanceof DuplexMemoryStream)) 
        return new DuplexMemoryStream(options, timeout);
        Duplex.call(this, options);
    this.data = [];
    this.wait_for_write = true;
    setTimeout(() => {this.wait_for_write = false}, timeout || 0);
}

DuplexMemoryStream.prototype = Object.create(Duplex.prototype);
DuplexMemoryStream.prototype._write = function(chunk, enc, cb) {
    this.data.push(chunk);
    cb();
}
DuplexMemoryStream.prototype._read = function(size) {
    while(this.data.length) {
        if (!this.push(this.data.shift())) {
            break;
        }
    }
    if (this.wait_for_write) setTimeout(this._read.bind(this), 0); 
}