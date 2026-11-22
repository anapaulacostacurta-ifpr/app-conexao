import urllib.request,json,tarfile,io,pathlib,shutil,hashlib,base64
root=pathlib.Path('dist/vendor');root.mkdir(exist_ok=True)
for name,version,source,target in [('pdf-lib','1.17.1','dist/pdf-lib.min.js','pdf-lib.min.js'),('@pdf-lib/fontkit','1.1.1','dist/fontkit.umd.min.js','fontkit.min.js'),('jszip','3.10.1','dist/jszip.min.js','jszip.min.js'),('docx-preview','0.3.6','dist/docx-preview.min.js','docx-preview.min.js'),('html2canvas','1.4.1','dist/html2canvas.min.js','html2canvas.min.js')]:
 meta=json.load(urllib.request.urlopen('https://registry.npmjs.org/'+name.replace('/','%2f')+'/'+version,timeout=30));data=urllib.request.urlopen(meta['dist']['tarball'],timeout=30).read();alg,value=meta['dist']['integrity'].split('-',1);assert base64.b64encode(hashlib.new(alg,data).digest()).decode()==value
 with tarfile.open(fileobj=io.BytesIO(data)) as t:
  (root/target).write_bytes(t.extractfile('package/'+source).read())
  for m in t.getmembers():
   if m.name.lower() in ['package/license','package/license.md','package/license.txt']:(root/(target+'.LICENSE.txt')).write_bytes(t.extractfile(m).read());break
shutil.copy('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',root/'DejaVuSans.ttf');shutil.copy('/usr/share/doc/fonts-dejavu-core/copyright',root/'DejaVuSans.LICENSE.txt')
(root/'README.txt').write_text('Local dependencies: pdf-lib 1.17.1, fontkit 1.1.1, JSZip 3.10.1, docx-preview 0.3.6, html2canvas 1.4.1. npm integrity verified. DejaVu Sans licensed font.\n')
