import type {Account,Question,Attempt,Stimulus,ExamPackage} from '../types';
const keys={accounts:'tka_beta_accounts',questions:'tka_beta_questions',attempts:'tka_beta_attempts',stimuli:'tka_beta_stimuli',session:'tka_beta_session',exams:'tka_beta_exams'};
const subjects=['Persamaan Garis Lurus','Garis dan Sudut','Teorema Pythagoras','Segitiga dan Segi Empat'];
const base:Question[]=[
{ id:'q1',number:1,subject:subjects[0],topic:'Gradien',type:'mcq',text:'Gradien garis yang melalui titik A(1, 3) dan B(3, 7) adalah ....',options:['1','2','3','4','5'].map((x,i)=>({id:String(i),text:x})),answer:['1'],explanation:'Gradien m = (7 − 3)/(3 − 1) = 4/2 = 2.',points:1},
{ id:'q2',number:2,subject:subjects[0],topic:'Persamaan garis',type:'mcq',text:'Persamaan garis dengan gradien 3 dan melalui titik (0, 2) adalah ....',options:['y = 2x + 3','y = 3x + 2','y = 3x − 2','y = x + 3','y = 2x − 3'].map((x,i)=>({id:String(i),text:x})),answer:['1'],explanation:'Bentuk y = mx + c. Gradien 3 dan titik potong y = 2, sehingga y = 3x + 2.',points:1},
{ id:'q3',number:3,subject:subjects[1],topic:'Sudut berpelurus',type:'mcq',text:'Dua sudut saling berpelurus. Jika salah satunya 65°, besar sudut lainnya adalah ....',options:['25°','65°','105°','115°','125°'].map((x,i)=>({id:String(i),text:x})),answer:['3'],explanation:'Sudut berpelurus berjumlah 180°. Jadi 180° − 65° = 115°.',points:1},
{ id:'q4',number:4,subject:subjects[2],topic:'Teorema Pythagoras',type:'mcq',text:'Sebuah segitiga siku-siku memiliki sisi siku-siku 6 cm dan 8 cm. Panjang hipotenusanya adalah ....',options:['7 cm','9 cm','10 cm','12 cm','14 cm'].map((x,i)=>({id:String(i),text:x})),answer:['2'],explanation:'c = √(6² + 8²) = √100 = 10 cm.',points:1},
{ id:'q5',number:5,subject:subjects[3],topic:'Luas segitiga',type:'mcq',text:'Segitiga memiliki alas 12 cm dan tinggi 8 cm. Luasnya adalah ....',options:['24 cm²','36 cm²','48 cm²','72 cm²','96 cm²'].map((x,i)=>({id:String(i),text:x})),answer:['2'],explanation:'Luas = ½ × alas × tinggi = ½ × 12 × 8 = 48 cm².',points:1},
{ id:'q6',number:6,subject:subjects[1],topic:'Garis sejajar',type:'mcma',text:'Dua garis sejajar dipotong sebuah garis transversal. Pernyataan yang benar adalah .... (Pilih semua jawaban benar.)',options:['Sudut sehadap sama besar','Sudut dalam sepihak berjumlah 180°','Sudut bertolak belakang selalu berjumlah 180°','Sudut luar berseberangan sama besar','Sudut berpelurus sama besar'].map((x,i)=>({id:String(i),text:x})),answer:['0','1','3'],explanation:'Pada dua garis sejajar, sudut sehadap dan sudut luar berseberangan sama besar, sedangkan sudut dalam sepihak berjumlah 180°.',points:1},
{ id:'q7',number:7,subject:subjects[2],topic:'Triple Pythagoras',type:'short',text:'Tiga bilangan 5, 12, dan ... membentuk triple Pythagoras. Tentukan bilangan yang belum diketahui.',options:[],answer:['13'],explanation:'5² + 12² = 25 + 144 = 169 = 13².',points:1},
{ id:'q8',number:8,subject:subjects[3],topic:'Sifat segi empat',type:'tf',text:'Tentukan Benar atau Salah untuk setiap pernyataan berikut.',options:[{id:'0',text:'Persegi memiliki empat sisi sama panjang.'},{id:'1',text:'Jumlah sudut dalam segitiga adalah 360°.'},{id:'2',text:'Diagonal persegi panjang sama panjang.'}],answer:['true','false','true'],explanation:'Persegi memiliki empat sisi sama panjang. Jumlah sudut segitiga 180°. Diagonal persegi panjang sama panjang.',points:1},
];
export function load<T>(key:string,fallback:T):T{try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}}
export function save<T>(key:string,value:T){localStorage.setItem(key,JSON.stringify(value))}
export function getAccounts():Account[]{return load(keys.accounts,[{id:'a1',username:'siswa01',password:'12345',name:'Alya Putri',role:'student',className:'IX A',active:true},{id:'a2',username:'tester01',password:'12345',name:'Tester Demo',role:'tester',className:'Tester',active:true}])}
export function setAccounts(v:Account[]){save(keys.accounts,v)}
function makeDefaults():Question[]{
 const out=[...base];
 const extras:any[]=[
 ['Persamaan Garis Lurus','Persamaan garis','mcq','Persamaan garis yang memiliki gradien 2 dan memotong sumbu-Y di 5 adalah ....',['y = 2x + 5','y = 5x + 2','y = 2x − 5','y = x + 5','y = 5x − 2'],['0'],'Bentuk y = mx + c.'],
 ['Persamaan Garis Lurus','Gradien','mcq','Gradien garis y = −3x + 4 adalah ....',['−4','−3','3','4','7'],['1'],'Koefisien x adalah gradien.'],
 ['Persamaan Garis Lurus','Grafik garis','mcq','Titik potong garis y = 2x − 6 dengan sumbu-Y adalah ....',['(0, 2)','(0, −6)','(2, 0)','(−6, 0)','(0, 6)'],['1'],'Titik potong sumbu-Y diperoleh saat x = 0.'],
 ['Persamaan Garis Lurus','Hubungan dua garis','mcq','Dua garis dengan gradien sama dan titik potong berbeda bersifat ....',['Berimpit','Tegak lurus','Sejajar','Berpotongan','Berhimpit tegak'],['2'],'Garis dengan gradien sama dan konstanta berbeda sejajar.'],
 ['Persamaan Garis Lurus','Persamaan garis','mcq','Persamaan garis melalui (0, 4) dengan gradien −2 adalah ....',['y = 2x + 4','y = −2x + 4','y = −4x + 2','y = 4x − 2','y = 2x − 4'],['1'],'Substitusi m = −2 dan c = 4.'],
 ['Persamaan Garis Lurus','Penerapan','mcq','Biaya taksi terdiri atas tarif awal Rp5.000 dan Rp3.000 per km. Biaya untuk x km dinyatakan ....',['5000x + 3000','3000x + 5000','8000x','5000x − 3000','3000 + 5000'],['1'],'Biaya = tarif per km × jarak + tarif awal.'],
 ['Persamaan Garis Lurus','Gradien','mcq','Jika garis melalui (2, 1) dan (4, 5), gradiennya adalah ....',['1','2','3','4','5'],['1'],'m = (5−1)/(4−2) = 2.'],
 ['Persamaan Garis Lurus','Grafik garis','mcma','Pernyataan yang benar tentang garis y = 2x + 1 adalah ....',['Gradiennya 2','Memotong sumbu-Y di 1','Melalui titik (0, 2)','Naik dari kiri ke kanan','Gradiennya −2'],['0','1','3'],'Koefisien x adalah 2 dan konstanta 1.'],
 ['Garis dan Sudut','Sudut bertolak belakang','mcma','Pernyataan yang benar tentang dua garis berpotongan adalah ....',['Sudut bertolak belakang sama besar','Sudut berpelurus berjumlah 180°','Semua sudut selalu sama besar','Sudut berdekatan dapat berpelurus','Jumlah semua sudut 360°'],['0','1','3','4'],'Gunakan sifat sudut bertolak belakang dan berpelurus.'],
 ['Garis dan Sudut','Sudut sehadap','mcq','Jika sudut sehadap pertama 72°, sudut sehadap pasangannya adalah ....',['18°','72°','108°','118°','144°'],['1'],'Sudut sehadap pada garis sejajar sama besar.'],
 ['Garis dan Sudut','Sudut dalam sepihak','mcq','Sudut dalam sepihak adalah 3x dan 2x. Nilai x adalah ....',['18°','30°','36°','45°','60°'],['2'],'3x + 2x = 180°, sehingga x = 36°.'],
 ['Garis dan Sudut','Sudut berpelurus','mcq','Sudut yang berpelurus dengan 128° adalah ....',['42°','52°','62°','72°','82°'],['1'],'180° − 128° = 52°.'],
 ['Garis dan Sudut','Sudut bertolak belakang','mcq','Jika salah satu sudut pada dua garis berpotongan 47°, sudut bertolak belakangnya ....',['43°','47°','90°','133°','180°'],['1'],'Sudut bertolak belakang sama besar.'],
 ['Garis dan Sudut','Sudut luar berseberangan','mcma','Pada dua garis sejajar, pasangan sudut yang sama besar adalah ....',['Sehadap','Dalam berseberangan','Luar berseberangan','Dalam sepihak','Berpelurus'],['0','1','2'],'Tiga pasangan sudut tersebut sama besar.'],
 ['Garis dan Sudut','Penerapan garis dan sudut','short','Sebuah sudut berpelurus dengan sudut 35°. Berapa besar sudut lainnya dalam derajat?',[],['145'],'Sudut berpelurus berjumlah 180°.'],
 ['Teorema Pythagoras','Jarak dua titik','mcq','Jarak titik A(0,0) ke B(3,4) adalah ....',['3','4','5','6','7'],['2'],'Jarak = √(3² + 4²) = 5.'],
 ['Teorema Pythagoras','Jenis segitiga','mcq','Panjang sisi 4 cm, 5 cm, dan 6 cm membentuk segitiga ....',['Siku-siku','Lancip','Tumpul','Sama sisi','Tidak dapat membentuk segitiga'],['1'],'4² + 5² > 6², sehingga segitiga lancip.'],
 ['Teorema Pythagoras','Penerapan Pythagoras','mcq','Tangga 13 m bersandar pada dinding. Jarak kaki tangga ke dinding 5 m. Tinggi yang dicapai adalah ....',['8 m','10 m','12 m','13 m','18 m'],['2'],'Tinggi = √(13² − 5²) = 12 m.'],
 ['Teorema Pythagoras','Triple Pythagoras','mcma','Kelompok bilangan yang merupakan triple Pythagoras adalah ....',['3, 4, 5','5, 12, 13','6, 8, 10','2, 3, 4','7, 8, 9'],['0','1','2'],'Ketiganya memenuhi a² + b² = c².'],
 ['Teorema Pythagoras','Pythagoras','short','Sisi siku-siku segitiga adalah 9 cm dan 12 cm. Panjang hipotenusa adalah ... cm.',[],['15'],'√(9² + 12²) = 15.'],
 ['Segitiga dan Segi Empat','Jumlah sudut segitiga','mcq','Dua sudut segitiga masing-masing 50° dan 60°. Sudut ketiga adalah ....',['60°','70°','80°','90°','100°'],['1'],'Jumlah sudut segitiga 180°.'],
 ['Segitiga dan Segi Empat','Luas segi empat','mcq','Persegi panjang berukuran 9 cm × 4 cm. Luasnya adalah ....',['13 cm²','26 cm²','36 cm²','40 cm²','45 cm²'],['2'],'Luas = panjang × lebar = 36 cm².'],
 ['Segitiga dan Segi Empat','Keliling segi empat','mcq','Persegi memiliki sisi 7 cm. Kelilingnya adalah ....',['14 cm','21 cm','28 cm','35 cm','49 cm'],['2'],'Keliling persegi = 4 × 7 = 28 cm.'],
 ['Segitiga dan Segi Empat','Sifat segi empat','mcq','Bangun datar yang memiliki tepat satu pasang sisi sejajar adalah ....',['Persegi','Persegi panjang','Trapesium','Belah ketupat','Layang-layang'],['2'],'Trapesium memiliki satu pasang sisi sejajar.'],
 ['Segitiga dan Segi Empat','Sifat segitiga','mcq','Segitiga dengan dua sisi sama panjang disebut ....',['Sembarang','Sama kaki','Sama sisi','Siku-siku','Tumpul'],['1'],'Segitiga sama kaki memiliki dua sisi sama panjang.'],
 ['Segitiga dan Segi Empat','Luas segitiga','mcma','Pernyataan yang benar tentang persegi adalah ....',['Keempat sisinya sama panjang','Diagonalnya sama panjang','Semua sudutnya 90°','Hanya memiliki satu simetri lipat','Diagonalnya saling tegak lurus'],['0','1','2','4'],'Persegi memiliki empat sisi sama, diagonal sama panjang dan tegak lurus, serta empat sudut siku-siku.'],
 ['Segitiga dan Segi Empat','Keliling segitiga','tf','Tentukan benar atau salah pernyataan berikut.',[],['true','false','true'],'Keliling adalah jumlah panjang sisi. Jumlah sudut segitiga 180°. Persegi memiliki empat sisi sama panjang.'],
 ['Segitiga dan Segi Empat','Sifat segi empat','tf','Tentukan benar atau salah pernyataan berikut.',[],['true','true','false'],'Persegi panjang memiliki dua pasang sisi sejajar. Belah ketupat memiliki empat sisi sama panjang. Trapesium memiliki dua pasang sisi sejajar.'],
 ];
 extras.forEach((e,i)=>{const [subject,topic,type,text,opts,ans,explain]=e as any;const id='seed-'+(i+9);out.push({id,number:out.length+1,subject,topic,type,stimulusId:subject==='Garis dan Sudut'?'stimulus-angle':undefined,stimulus:subject==='Garis dan Sudut'?'Dua garis sejajar dipotong oleh sebuah garis transversal. Perhatikan hubungan sudut yang terbentuk.':undefined,text,options:(opts as string[]).map((t:string,j:number)=>({id:String(j),text:t})),answer:ans,explanation:explain,points:1})});
 return out.slice(0,30).map((q,i)=>({...q,number:i+1}));
}
export function getStimuli():Stimulus[]{return load(keys.stimuli,[])}
export function setStimuli(v:Stimulus[]):boolean{
 try{localStorage.setItem(keys.stimuli,JSON.stringify(v));return true}
 catch(err){console.error('Gagal menyimpan stimulus ke localStorage',err);return false}
}
export function getQuestions():Question[]{return load(keys.questions,makeDefaults())}
export function setQuestions(v:Question[]){save(keys.questions,v)}
export function getAttempts():Attempt[]{return load(keys.attempts,[])}
export function setAttempts(v:Attempt[]){save(keys.attempts,v)}
export function getSession(){return load<{username:string;role:string;name:string}|null>(keys.session,null)}
export function setSession(v:{username:string;role:string;name:string}|null){save(keys.session,v)}
export const examTitle='Simulasi TKA Matematika SMP — Paket 1';

export function getExams():ExamPackage[]{return load(keys.exams,[{id:'exam-default',title:'Simulasi TKA Matematika SMP — Paket 1',durationMinutes:75,questionIds:getQuestions().map(q=>q.id),assignedUsernames:['siswa01','tester01'],status:'published',createdAt:Date.now()}])}
export function setExams(v:ExamPackage[]){save(keys.exams,v)}
