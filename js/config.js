const MAX_COL = 8;
const MAX_ROW = 5;
const JUEGO = {
    "columnas": MAX_COL,
    "filas": MAX_ROW,
    "cartas": [],
    "jugadores": 2,
}
const POKEMONS = {1:'img/04xYYKR.jpg',
2:'img/09zu4vV.jpg',
3:'img/0aDfupS.jpg',
4:'img/0FsGseO.jpg',
5:'img/0iVaxSO.jpg',
6:'img/0Tgji2w.jpg',
7:'img/11gKi44.jpg',
8:'img/2xXfkHJ.jpg',
9:'img/30DZlzG.jpg',
10:'img/3GCuDsf.jpg',
11:'img/3twzWkQ.jpg',
12:'img/3VYNhRG.jpg',
13:'img/4mZOgOV.jpg',
14:'img/4qu3oB3.jpg',
15:'img/4VtJzGB.jpg',
16:'img/4ZhBw8I.jpg',
17:'img/5J27qfx.jpg',
18:'img/5SM0SGk.jpg',
19:'img/5y0sxx5.jpg',
20:'img/6P5oWNe.jpg',
21:'img/6xmp1Mu.jpg',
22:'img/7c0tZF6.jpg',
23:'img/7FM1JLe.jpg',
24:'img/7ozs6wz.jpg',
25:'img/8l5HeUQ.jpg',
26:'img/8N7E7c0.jpg',
27:'img/9c9DHD3.jpg',
28:'img/9OjTGsN.jpg',
29:'img/acxRONd.jpg',
30:'img/AV67trM.jpg',
31:'img/Avlqq7c.jpg',
32:'img/AX5b89T.jpg',
33:'img/BB0FQ8j.jpg',
34:'img/BGYaJSy.jpg',
35:'img/bpMMITk.jpg',
36:'img/C5urAaQ.jpg',
37:'img/cQVaiim.jpg',
38:'img/CSjQecu.jpg',
39:'img/CvPPJbS.jpg',
40:'img/di96vnZ.jpg',
41:'img/EaFRfsg.jpg',
42:'img/efrt6jd.jpg',
43:'img/eIw0vK7.jpg',
44:'img/eONKISd.jpg',
45:'img/eWtONu5.jpg',
46:'img/F6WgOZg.jpg',
47:'img/fEM9eRF.jpg',
48:'img/fGWo53u.jpg',
49:'img/FIsZdaQ.jpg',
50:'img/fKDZtEs.jpg',
51:'img/FmsU2gC.jpg',
52:'img/fUP91Ll.jpg',
53:'img/fuy67b4.jpg',
54:'img/fYo7LWP.jpg',
55:'img/gA9NJxh.jpg',
56:'img/H1xJTDo.jpg',
57:'img/HauJmTP.jpg',
58:'img/HGOTeBr.jpg',
59:'img/HjNkydI.jpg',
60:'img/HmWOQhU.jpg',
61:'img/hV4UDZG.jpg',
62:'img/i0Qk0yQ.jpg',
63:'img/Iknb8sN.jpg',
64:'img/IKQ8Qtg.jpg',
65:'img/inD559w.jpg',
66:'img/iTdy5TZ.jpg',
67:'img/J3SflVm.jpg',
68:'img/JCsqqzd.jpg',
69:'img/JiELOmt.jpg',
70:'img/jn4oNJZ.jpg',
71:'img/K1Os51L.jpg',
72:'img/khezvYQ.jpg',
73:'img/KKHY7ae.jpg',
74:'img/KkqGfp6.jpg',
75:'img/KriL3NC.jpg',
76:'img/KUB6Pcl.jpg',
77:'img/kxANLTC.jpg',
78:'img/l3nIjXs.jpg',
79:'img/L7jelYO.jpg',
80:'img/LeiuOLg.jpg',
81:'img/lkL30u8.jpg',
82:'img/lmwPb1D.jpg',
83:'img/MBApaDT.jpg',
84:'img/mi1Awm5.jpg',
85:'img/msokWsp.jpg',
86:'img/MUwoOpt.jpg',
87:'img/mVZT4We.jpg',
88:'img/N1zQBVG.jpg',
89:'img/n5GXfvA.jpg',
90:'img/N68BwJN.jpg',
91:'img/N7LYeQm.jpg',
92:'img/On6mrS9.jpg',
93:'img/opHvEdw.jpg',
94:'img/OuMTceK.jpg',
95:'img/OxiXUhp.jpg',
96:'img/P1DpAAR.jpg',
97:'img/pfkPnHj.jpg',
98:'img/PTQESHg.jpg',
99:'img/pVUPzNi.jpg',
100:'img/pzmhxc1.jpg',
101:'img/Q2ZZEQl.jpg',
102:'img/QNsgEzK.jpg',
103:'img/QRkE3hr.jpg',
104:'img/R2bcigw.jpg',
105:'img/r9oz9Gb.jpg',
106:'img/RaOdthE.jpg',
107:'img/RCUVCNl.jpg',
108:'img/rhRRfUW.jpg',
109:'img/rKHwU81.jpg',
110:'img/rMZrS5Q.jpg',
111:'img/RwmHjFG.jpg',
112:'img/S6fYuPM.jpg',
113:'img/SAt3dkm.jpg',
114:'img/sBDQVZJ.jpg',
115:'img/stT5JGi.jpg',
116:'img/swqNRjb.jpg',
117:'img/TBkyhvs.jpg',
118:'img/tEAHeHY.jpg',
119:'img/Tg5rNiG.jpg',
120:'img/THymhhV.jpg',
121:'img/TQEROP0.jpg',
122:'img/TyUPLEf.jpg',
123:'img/u51ixQg.jpg',
124:'img/U7hM9v7.jpg',
125:'img/u8EJxc2.jpg',
126:'img/UoGhXXu.jpg',
127:'img/ut9uhde.jpg',
128:'img/UURdXYL.jpg',
129:'img/v7KZ2o7.jpg',
130:'img/VnjTo3I.jpg',
131:'img/VTJpwkI.jpg',
132:'img/WfmRj6e.jpg',
133:'img/WLJYTOU.jpg',
134:'img/wQ5nbUJ.jpg',
135:'img/wtF6Tzj.jpg',
136:'img/WZVhxpy.jpg',
137:'img/xLhX1Nt.jpg',
138:'img/XLOmDJ2.jpg',
139:'img/XNFgnGe.jpg',
140:'img/xQ9ouYZ.jpg',
141:'img/XQngdNo.jpg',
142:'img/xQPIT8C.jpg',
143:'img/XSbzNe2.jpg',
144:'img/YcGO0bh.jpg',
145:'img/YcZsGK0.jpg',
146:'img/yLTYMhW.jpg',
147:'img/z6URYD7.jpg',
148:'img/Z82DMBr.jpg',
149:'img/ZHNAdD3.jpg',
150:'img/ZSvuRgC.jpg',
151:'img/zyIC1fS.jpg',
};