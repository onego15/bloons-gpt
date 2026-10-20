const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const {execFile}=require('node:child_process');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()};let file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()};fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found')}else{res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)}})}).listen(4173,'127.0.0.1',()=>{console.log('Mosslight: http://127.0.0.1:4173');if(process.argv.includes('--open')&&process.platform==='win32')execFile('cmd.exe',['/c','start','','http://127.0.0.1:4173'],{windowsHide:true});});
