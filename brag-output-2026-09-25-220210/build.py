import re
src=open('../src/components/marketplace/brand-logos.tsx').read()
logos={}
for name in ['Slack','Jira','Linear','Github']:
    m=re.search(r'export function '+name+r'Logo.*?(<svg.*?</svg>)',src,re.S)
    svg=m.group(1).replace(" className={className}","").replace("aria-hidden='true'","aria-hidden='true' style='width:28px;height:28px'")
    svg=svg.replace("currentColor","#000000")
    logos[name.upper()]=re.sub(r'\s+',' ',svg)
t=open('index.template.html').read()
t=t.replace('__FONTS__',open('composition/assets/fonts.css').read())
t=t.replace('__ICONS__',open('icons.svgfrag').read())
t=t.replace('__RMS__',open('rms.txt').read().strip())
for k,v in logos.items(): t=t.replace(f'__{k}__',v)
assert '__' not in re.sub(r'window\.__\w+|__hyperframes','',t), re.findall(r'__\w+__',t)
open('composition/index.html','w').write(t)
