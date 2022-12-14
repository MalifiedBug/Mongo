import express from "express";
import cors from 'cors';
import { ObjectId } from 'mongodb';
import { MongoClient } from "mongodb";


import * as dotenv from 'dotenv'


dotenv.config();



const app = express();

app.use(express.json());

const PORT = process.env.PORT;  

console.log(PORT)


const MONGO_URL = process.env.MONGO_URL;



 async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    return client;
   }

   const client = await createConnection();


app.post("/addpost",cors(), async (request, response)=>{
console.log(request.body)
const client = await createConnection();
const result = await client
.db("webcode")
.collection("rent")
.insertMany(request.body)
console.log(result)
response.json({
    data:result
})
// return result;  
})


// app.post("/getpost",cors(), async (request, response)=>{
//     console.log(request.body)
//     const client = await createConnection();
//     const result = await client
//     .db("webcode")
//     .collection("rent")
//     .updateOne({id:"1"},{$set : {img:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRYYGBgYGRkaGBgYGBoYGhgaGhgZGRoaGRgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ9QDs0Py40NTEBDAwMEA8QHhISHzQsJCs0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKgBKwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAECAwQGB//EAEQQAAIBAgQCBwYEAwUGBwAAAAECAAMRBBIhMQVBIlFhcYGRoQYyUrHB0RNC4fAVYpIUFnKCoiMzQ8LS8QdTY3ODk7L/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKhEAAgIBBAICAQIHAAAAAAAAAAECESEDEjFRBEEFYYETIhQycbHB0fH/2gAMAwEAAhEDEQA/APLCIwMdWvIkSibJgxxISYgFk1m3BVspsdj6GYrxwYDTDyy5ZhwFfMMp3HqISRZDKQ4EkFklWWokCitUgTiuHyvfk2vjz/fbOmSnMfG8Jmplhumvhsfv4RJ5JaOUKyJEuYSDCakMrIjWk7RWioRC0VpK0e0dARyx8slliywAjljqslaSUQAQWWIsQk1EBphPg1C5ZuoW8/8AtChpy3g2FtSUndul57egE1NRmLlk1SwD8kYibmpyl0hYcGJxKKhsCTym2osD8Tq/lHefoI1kTMdV8xJlV5IGRYy6Isi0jEZAmOhWM0RFpMSpzAVkGMaPGgBUDLVN5TJIpgBIiSWStI5bQAlHWREksALqLlWDDlD1BswDDYznRCXC8VlbK3ut6Hrg0NMMhZVjMTkXNz2A65tVJy/EsVnc290aL95CWS3INYPiCvzseo/TrhIG6kHacQGtCmB4wwsr6j4uYHb1wlHoSl2Z8VSKOyHkbeHI+VpTlhnj1IHJVXUOLEjrGo9L/wBMEWlp4M2RyxrSUe0Yiu0e0naPaAyAEcrJWj2gIhaOBHtHtABATRhqZZlQbsQPM2lIhPgaDOXOyKW8SLD0v5RN0ilydDWcILA2A0HlAeJ4oQ1lP2mHHcTZyQDpc69esxK0zjHs1cujrsNVDqGB39OyOyQNwvFZGsfdO/Z2zo3TqikmmNSTQKxL5FLHw7TynPVHubnc7whxfFZnyj3V07zzP0gstNIxM5SHkWMlINGKyDGJRJBbx3S4gIpd4xiK2kTABo0UWWAEES80rThROFnL0Rc9fXIphDexFjG0SpJg/wDDjMkOpwtiL5TbumbEYErEigMRaOJpq0pnKkRgPeKNeIQAL/xBmoFbEuNCRr0PiPyPfA80YXEMjh13B8+sHsM6duEUcSgqJ0GbmvXzDLte8TpAceYpu4jwirR1Zbr8a6r4/D4wh7K8K/Ef8Rx0EOgP5n3A7hv5QtVYBTA8Gf8AsrK18zdNVP5SNQAORPPvnMz1JGE8+49hPw67qNmOde5r/I3HhFGVsGmgcBHCxLJyiSGWPaSijoBgI9o9o1oUA1o8e0aIBTocBwZqmEYqSGdsy8gwS4Ct2Xzek59VJIA1J0A6ydp6bhUFOmiD8ihe+w1PjIk6KirPJnBBIIsQSCDuCNCDHUzrPa3hGa+IQaj3wOYH5+8c+zugXg3Bqlc3UWTm527l+IylJNWOs0VUUdiEQEk9UPYmo9CgEdgXa4W35Rz152+oh7C4Cnh0Nhawuznc23uersnEcVxpquX5bKOpRt9/GSnuB4MZaQMcmRLSyR7x0W8lTpkzdQwpO0BmdaccUofwPBXfZT5TbivZ2oi3ZbCFoTOOq0LzIyWnZUeBMekRp2wdxjhBAzKNRuOuOnVk7ldACnTvLfwpQlSxmn8YQwN2dvgKY0nQJwWlUXXRuTDcTm8HUh/C4ywmiOVrs04LiVPDg0cQgIGzgDUTnuNth3YtTuAeR/Sb+Kp+KO3lOK4ozUjlvc/KKUa4L05uTp+jJxFRewmAVLbx3qEyppmdJZkVtv34SDIRISxax56wEQvC/s/xY0nyt7j9f5W5H6Hw6oNsrbaGRWlrrtziasLPQ14wnutabMDXoWypkA+EADc3Ok82GLcHQ6dR2mqlxEfmUg9YP7MW0LPUEC9k5v21wmZFqAaobNb4Wt8jbzMGYDi7j3HzDqMJVuJ/iIyOujAg27RBJpgcYGkg0T4Rx+X1EbD4Go7hEW7NsCyjYE7k2GgMtASvGzibm9mMT1IO+rT/AOqVN7OYkfB/9iH5GWoSfpkuSjy0Z88lnEuHs7iP5P61j/3dr9af1iVsn0zN62mvaM5MgWl+J4VVRczZSL20YGZ0wzn8vqJEoyi6aouMoyVxdhn2Yw+fEJfZOmf8u3+orPRcwnBeztQ0c7Fek1gNthr8z6TdieMuRqQo8plJNs0R02JxSKOkR3QY/GkUZUFgNAALADsA0E5DFcWHK7HyHmYNqY5zzt3feLb2O64Og9pONF1FNT72rd3IeY9BOZZ5eGzrlJ1Gx+hlIp294ykqJbsioJ2lwQDVj4Ss1uSi3bIDXeMDSr320hrhTAan1gNXA7ZaK7H9I0JnqXCvaOnSUHLmNoTwuJOJbPUFkHup9TPN+BL0wKo6LaDsPKd/RfILDblNFBVZhObujXxALawAnKcRQQzisReAsW8RPLwcZxvh9iXQd4+ogLOZ2+JF4EqYBCTM2bqVh6g8JUa0D02m2i4AzHYepmiZlJWEcXjRTS+7HYc9dvEwA2HzXL6s2p+w7BNOE43hmJFQ2a+hdbDqBVjtpzhP+yU3GZG0O1jmEe5MSjtOQxnDrarBToRO3xPD3GwzDs+0A43C67WkSRtGVgKIy+rStKSJJdkZoII06vnK8Olzfq1+01mifrAGzLljhZpXCk8penD3OwgKzLTp6zruH8MZgALmwA9IIwHDHNRFy7nTwF/pPTvZLCup6VMnxAlU0hWjhsdgCuhFoPwlG79wJ+n1npXtdwp3OZKdtOsfecLhqWR3z3U5bLsNbjrmmirkhSmopsc4U29490ZcHLMRWC2swPiJT/bO0ec9RRTOTU15QbT5+smrCYJWFW9wVpO696gH7+cFsGAuVIBFgelbbleEsNihle7KLoy+8NiNZiw3EjorVFCjSxKaDl3xL9reTHWjOSU2sPj/AIZK63Tutrr1iX4OjeV4nG5wFZ1awsuq8wBy7hD/ALP8NqMwshI8vnOPy/5k/o6PExFp9kW4U2TNY2nLcYw5Vx2j1Gk9xxmGP4GUUrG29x955f7ScLqZc2S3TC/1betpxrJ1NpHFMshlhl+EPzEofh7DeFMdowoJGuugPgfpNyYVr2AJPUBcyWLwLpoykBxpcW1iCwSDJXkQOUvo07wAlQpFodwOCA1MbhuBZvdUnt5ec6Chw5VF3bbe2nmTLiuyJS9GJadxlte/V9IawFWoECVQQdlY/m7+q/zgrEe0mGo3CdJhyTXzc6esHPxrFViCqIiA3s1yzW5X5X6wPGW5dGWxs6OvVg6u8lTxQqJmG43HPq17eUzVGkNjjGjNWMzWmipM9pDZokXURKcVXztkHuj3u74fHn2d8bF4jIuUe8dB39vYJRh9B6k9Z5mNBtNjU0YWZQR2j5dUH4vCrSGem7o1wAFY9I8h85tV4Ir4nO+b8q6L29ZjbHFGrD+0uIp+/lcfzDK3mNPSEk9paFQWqIV/xDMPBhOexCZxa9phfCsNtZNjaR1tTh1GqC1Jx4EMPLcQTiuE1F5Zh/Lr6bwbTw5FiCQ3WDYg94hjAYisXCZ845lhewG5vv8A94DLuG4JEQVKoJBNwnNyNba/lA1PlCg4tgn98ZCfiUr/AKl09ZGqhAzMbs3RHUqDZR6X6zBGLKZiLDQAH5/WJiWTqMPgMO+tKop/wsr/ACmulwojax9J5e9Jw1wpGuhA1HisJYDjOKT3Kr2B2Y5x5NciWpUS437PTeF4UrXBZSAiGxIsCzHkeZATltnHXOtwuKC7ETx9fa7E2GZUuADfKwuDqDbN1Wkv734m9gKXir/9cbdiUWj17F44MNSPMTivaHhlGv7+4vZgQCLzi6/tpibkH8PQkHoNy/zxfx/EMmctTG+mRrn/AFSU6KcWy3EezSj3XfuuLHwAgyrwG3OTbj1frX+n9ZTiOMVwASU1/l/WNsaTQw4Gev0m3DezQPvM3haDqfGaxIAK6/yiajxfEKbFx4IIrGdRwn2eoIwY3YjbMbjy2nf8MrIoFiJ5DheLYljYVAunwKYm9pcSjFfxmBG9qdO0N3ojY7s90fiIItcQDxpRUpOi2LmxS+l3Vgy68tQJ5snHMW1POMQ1tTb8Ony8NJlbj+KP/Ga/Yqf9MExuLO9r8OHMgQJjcZgqZOeojEflBzn+lPrOZ4pRrVGXPVd8yI9nc5QWBuAo00IMDLw6p1ADr0H6xyk2KMUjrX9q6Y0oUHYdZARe/S5k14g9VWFdAEBB6AOZOpxc9IdY6oBwdMouViCddr/WHsDVF1bkw18d/WQlkt8A3E8CJe6suRgGDDUG/NesHfxl+XDYf32DN1HpH+gfWaOK4E/huEZlsc9lJAt+YAchubdc5h8KLZhy37jz8/nGJZC+L9rW2pIF/mf6KPvAWIx1Ss1qjs1+V7L4KNJE4UE3vYdU0UqSrsPE6wBJI08KVEcB1HS90nWzdXj9IeZ5zdQXFvI9R5GEsHi866+8NG7+vxlJikrNK4jI+b8p97s5ZvofDqm+pY6jYwS7XlvD8T+Rv8p6x9xJkJIveUy+oJRINKBgcsxc+A6hLleZVaM9bKCTLJJY/E6ZBud+wfrMoYAd0pDkksdzE+otAqiX9qHbLc15bhVw6oc4Yvy+H03mbN1QEaaA3bq0Hef0+cO8Cw3RLn8xsP8ACDr6/KBEQkqg3JA8Tue4fITqkIRNNlGVfDSAmZsfXFyeSj5bzm2Ykkncm57zvN/Fa9lC/Ede4fraZMDRRzld8l/zb20NtO+0ARWH7ZNbnQbnQd50HrKXwgQ3Lg2v7pvful3DDeot9lux8NvW0BnRPhUudBpYDuVQv0gvE0h+IQo0VFHibn6ibBW0/fODDUOZ2G5Py0HyjbJRF8KnwDyk6NNbhbADXTwJmFBWLZjcC/MEAzZRqdLwMRRKrRGukzZQQAQD3zU77waQSLA2gM0pTUagDyEup0wST2D6wbhqbbrdtQLDck9kIUhUTek+v8sAN34YC3G9x5WP6RBE3KqT3CQR6jLYUamtvyyjEYWqeiAyMN1trqLjQaxOrBM3lRlIAABB2FuU1YOklgwA1VT5iBcIKigh7g30zXB8bwjgqvRA6rjyOnpGsCk7J8VNhTbqzU/Ddf8A8nzguriABcmwhDiLXpuOYs48N/QHzgMBW0ba942JIuSuG1BhLhlbQr1G47jv5Ef6piNOgiEJmZybkm1gLEWFjruTfulWErZXU8joe4/rY+EQztFfMoPZr9ZymIo5KjIfd5dqtt429ROg4fVvdfEfX6TFx+hdVcbr0T3E6eRv/VGyeDnGQgkHcG0pqVG5DTrtNOKGzeB8NvTT/LJ4PiL0wQLENvcA/OIoyUcQToZZTr5Hzcjo3d1+EoauCSdvACIm8ADJeVOToRuNQZjwtbTKeW3dNBeAgvQrh1vz5jq7IrQVh6+Rr8jv94VziQ8FoA5plr1Lm3IfOSq1LDtMoEsRMmTw+CqP7qk/LzlQliVSNjAGhGmVJBlmHGt+rXx5ffwlJa+pmhBYW57n9+UAC/Bk1aoeXRX/ABN/39YQxb2AQct/19ZVhqeQKnwjM3+I/s+QlBcu+nMwWRM14DhtGrmeszDWyZb7Dcnxml+CYQbFz2gzbhcOoUA8hYS9cKvWPWaqBg9XPIGPB8N1Of8ANaasNwvCodFe7Cx6Z8tvl2QtgMKFfOwBRAXPblFwPE2HjMlfDVVAYqxDaixvYtZthte48j1RKWWq4JbtYbInC4b4G0Pxtp6TF7OcPpVVZnFszEoAfy3Omt5HiedUcZWzlDZSbHUb6kcrnwjYFSioBoUAGm17a+t4paM9W1DDSs9r4bxI6+o1LKS9h6rwKmwsQxHeNPSYv7pgnoBj3Mt/K15oocaZdxeEaPEqb7GzdR0PhOBa/kePJ/qQtfaPS874RasVtuLXtf5OdxPs0EHTWoO/bztB1Tg9IA2zf1T0ajxNxoxzDtkOImg9N2ZEuEc7WNwp6ptp/NePe3U06+1wfOa3wnmaeY6lo8b4czFgTtnSx5e+t9ey48513DCCTpa5vckW0JbYa7EcpyNFyGXVBZl6K7qcya5ud7ek6jC45ubMdNOkfGbPKBNxl+A1Re1ulmuOXZpre0Be1rlHV10LKOdtbkb9w9YTw1dubHzMHe1rHJTcbgnU7bg38Apk3ukikkkHuHezNGugqLiAQRuUZteYzCpqRtsJcPZFEF/xB722Q323/wB7tMHsNis1Gol0ujq4KaHKwKHMORJTMe8GdTw57Pa973GvSt6xSbjaKSjIBP7MoQf9oByN03B5/wC8mT+5dAED8ZbdeU20t/6l+fpO7YEH/eL3ZAPrJNXTrEne17G9OJwQ9hsNe/44v3Mf+ecTxHCmnUdD+UkA9Y657ga6dYnn3/iNw4XXEJs3RYjrH7Hk0uMrJcUlgC4DFe63n8j9YZqoHUqdmFv1nI8Oq7jxHyP0850eGrXQdY08pRJz1RD0kO+o7iDp6iDe+H+N0rOHGzjXvGnyt6wJiRrfr18ef38YkBc2GolLhyH+Ei/keUyItorxi0YUOTY3G4mtHuLzEQd9Ld4v5bx6NSxt1wA2Ex1xLDQHaVZooAY2e5vGLSIMktucBCNxY232j365PoDrY8r2t26SomAF1MAnTYa6wjw2nmcE7L0j4bevyg+mLDv/AGP32wvhOglzoW1Pd+/nE2NGyvVsp62P79LCX8Ipr0nbfZOWvMnuHzgevi1JG9jsbH5WvILiWvYHVb6WNmG+nV1DXwlR5JlxR1r18p0N5poVr8x5ziRimte5yk7i+ZOZG2oA00HjLqWJfMLm18oHROVr66La6m3Mma/rfRg9DdJtOvqjua9XoFRa7WvbqGszZ6uX33Jv8baAX7e35zlMPiGso6RN1JW5zAMzXzPbpLb8o5CaMPiqjMFXOWYJ+UD85BAQ6ID8d9gJMtTpI1emm0+KXpGniiVXZFGY9LM+uuVVIAN9SDqPCbKatzVh3gwJXrsVDAuAiKj1AXJuCwbQm+bMPe9ALmWPxGrcOUbVStNACVJGVWZm/Mee27WHXHo+RLTtpcnX4+vPQdwdBwgW385S9VeZEBmtUNqd3z3zO1jcA6hR1C3UdNu2VtiCcz2fINEW3M/mYdWmp1tcCb/xrfMUz1YfN+Quaf4OiXHhdqlv833lGM4p0G/2wN1YWuNeidIDye4pvmfVmO1ids19D2W+0zY+w2BUAkAEWJ37762N+Y6pzaktGfOmrNJ/Naji04LOCpQQV6Kr0tANXHSX3juRpp3Q+jEIDzv9O/6Tm0AV0YMTqpuwtzU3N9xe/lOw/iNIiz1adr7L+H1b9DXnvIukfOSi5T5/0Ph3MXH6efD7E5SD59Hw3MlQxVEoT+IgIOgzLe3dudSdZsJpvTYZ1JZTYX5+cHFRzYozlJpUD/YOqwrlCqgVEZdCAb2BRTtsEfXtnXU3ysCCL+I+k5zB4VKDJXJVbEG5Nr3Go10uQTzhQ45X6SI7KScpUI2lzzDzNyUsm+1xOifDXObOouAbHfaZnwan/iJ6feZ6HGLKA2HqsRzC0/q8X8VW2mFq+VL5Z4WkbxWlWSw4RdvxU/0/eLE4FKlF6JdXzC6jTRgPkdu4mUjigOhw1QDtVPoTHp8SN7rhql+wU/mI9yBrSrH9jyh8yVSG3ViDy9PKGsDVsSOuavafhNSpUNVaDJnOoZ0XXsJ0Otz4iNg+CPZb1aCnTRqqX/03HrG5I5trI4xM6MvMdIeH6X85ztUXUjq1E7k+z9f3lKOP5X+4AnMcU4TWpMxamwW981rqB3jSJSV1YOL9gHNFk2J2PMWJ8r6eMVZbH1ESViLgE2O/bLJIXiMk9Qn7cvKQgFmqm9xJTKj2M03gNMzig/wnyl+HwZJ6dwvYAT4CFQE+L1/SSH4fxHz/AEjwTkxrgaeW5FS/LVder8unrJLgKe5WpYDbMpJbtbLYDstftm7PT2zHzH2jh6fW3XuPtE2gSZnTC0zc5HCgbBlJLdrZbAdlppVEIN0fQDKodTrzzMV27ABGD0/iPXuPtEKlP4j6QbQ0mPToU7ksjcsiBgRfnndgWPhaXUUpdJimugRVfQHnnJ1P1vylSvT+I+n2k1q0bWufSLcl2Nxb6L1p08pdkJJbRc/+zAG9zbOW35/aRwNFC93BKqCSqFFOvK7A2ES4ihaxL+BX7S+lisMvN9dNCv2kOS6ZSi8ZRbhERnzGmMtrlFcA6C18zDTeX8KyB+jSS1iSmcgkAG/Ta55mUUuI4ZdVNQEgj3k2PhJU+J4ZSSpqAkEe8mx0PKS2s0n9FqLxbX2bcPWpuCDh0IVSQqtlF+V76kanbWPhqyXJNJHyhiouQFPWQdSBrpfWYU4tQW4XNrvcrr6RDjVIbWHgI4tL0xNN8tGynWTp3pIxIAB1UKdSGI/N3X8TM2Gw6hXDIGuLC7EZSb3Nh719JQ3GE6wO60ieKp8UeOmUnXs1UsMgR8wzEgZXzG6dZCj3iZlXAoLXXMCekGOhBNyDroDIniqfFIniifEfOTVeinKLFXwtAOxFNAL6KBmsLAWUka9fnLRRw4W/4V9SLZBe1gQbdWtvAyn+J0+uP/F6fXHkh0EMAmFDgPh2INtQosARz1Fjfca+M1qMMoZfwmDZhZkHRyknfUbafrAf8ZpjnJDj6CS1b4C/6GrFor9AozLfTYgdW7A9d9O6ZkwaL0RRqC2t1fJzvpZzfxi/vKg/ZkG9pl/d5X4EvtmqlgM9zeqlvjrNr2jLf5x24OB/xH/rc+hMwt7Sp8I8pA+0q/Av9Ihb6LW32a2wri9rNbrdkv3WZvpKwao/IfCsfraZD7Rj4R/SJE+0X8o8hF+7oT2+mXYoFhZ6bEf+58jfSYjgxyRx/wDJJt7Q9g8hIHj/AGRrd0Q67LcPQdDdGrIf5aqj/lN4WXiuJy2ZnYEW6TUifRBAZ472SB42eqDi3ygTrhl9TAo29Fuyz/YSluFJ/wCW4/z/AHWVnjTSB4y0pWLA78IPIOO8g/ICVng7dfpHPF3kTxV5WSaQ54O3X++60X8Kf4h5SB4m/XI/xJ+uGQwYsxizGPFGA2Y9cfMeuKKACzHrjZjHigA9+2LN2xRQAQbtj5oooDFmjhooogGzRZoooxCzxZ4oogFnj5ooowFmiLRRRDGzRi0UUYhs0V4ooAK8QEUUAHEiTFFAGK4izCKKAmLN2RZuyKKArFmizRRQGPmiuIoohiuI9xFFAR//2Q=="}})
//     console.log(result)
//     response.json({
//         data:result
//     })
//     // return result;  
//     })

app.get("/getpost",cors(), async (request, response)=>{
    console.log(request.body)
    const client = await createConnection();
    const result = await client
    .db("webcode")
    .collection("rent")
    .find({})
    .sort({"id":1})
    .toArray()
    console.log(result)
    response.json({
        data:result
    })
    // return result;  
    })

    // app.get("/getpost",cors(), async (request, response)=>{
    //     console.log(request.body)
    //     const client = await createConnection();
    //     const result = await client
    //     .db("webcode")
    //     .collection("rent")
    //     .find({})
    //     .sort({id:1})
        
    //     console.log(result)
    //     response.json({
    //         data:result
    //     })
    //     // return result;  
    //     })

    app.get("/getpost",cors(), async (request, response)=>{
        console.log(request.body)
        const client = await createConnection();
        const result = await client
        .db("webcode")
        .collection("rent")
        .updateOne({id:"1"},{$set:{img:"changed once again"}} )

        .toArray()
        console.log(result)
        response.json({
            data:result
        })
        // return result;  
        })


    
app.get("/getpost/:id",cors(), async (request, response)=>{

    const {id} = request.params;    

    const client = await createConnection();
    const result = await client
    .db("webcode")
    .collection("rent")
    .findOne({_id: ObjectId(id)})
   
    console.log(result)
    response.json({
        data:result
    })
    // return result;  
    })










app.get("/", function (request, response) {
  response.send("?????????????, ???? ???????????");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ??????`));