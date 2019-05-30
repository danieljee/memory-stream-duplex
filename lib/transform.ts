import { Transform, TransformOptions } from 'stream';

export default function TransformMemoryStream(options: TransformOptions, transform: (chunk: any) => any): void{
    if (!(this instanceof TransformMemoryStream)) 
        return new TransformMemoryStream(options, transform);
    Transform.call(this, options);
    this.transformFn = transform;
}

TransformMemoryStream.prototype = Object.create(Transform.prototype);
TransformMemoryStream.prototype._transform = function(chunk, enc, cb){
    if (this.transformFn) chunk = this.transformFn.call(null, chunk);
    this.push(chunk);
    cb();
}