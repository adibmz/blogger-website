import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var arr = [];
var index = 1;

app.get("/",(req,res)=>{
    res.render("index.ejs",{arr})
});
app.post("/create",(req,res)=>{
    if(req.body.title.trim() !== "" && req.body.content.trim() !== ""){
        const now = new Date();
        const day = now.getDate(); // 1-31
        const month = now.toLocaleString(undefined, { month: 'long' }); // "January"
        const year = now.getFullYear(); // 2000
        const weekday = now.toLocaleDateString(undefined, { weekday: 'long' }); // "Thursday"
        const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }); // "22:01"
        var current_date = `${weekday} ${day} ${month} ${year} ${time}`;
        var data = {
            id: index,
            title: req.body.title.trim(),
            content: req.body.content.trim(),
            time: current_date
        };
        arr.push(data);
        index++;
    }
    res.redirect("/")
});

app.get("/delete/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const idx = arr.findIndex(item => item.id === id);
        if(idx !== -1){
            arr.splice(idx,1)
        }
        res.redirect("/")
})
app.get("/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const blog = arr.find(item => item.id === id);
    if (!blog) {
        return res.status(404).send("Blog post not found");
    }
    res.render("update.ejs", { blog });
});
app.post("/update/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const idx = arr.findIndex(item => item.id === id);
    if(idx !== -1 && req.body.title !== "" && req.body.content.trim() !== ""){
        arr[idx].title = req.body.title.trim();
        arr[idx].content = req.body.content.trim();
    }
    res.redirect("/")
})

app.listen(port,()=>{
    console.log(`listening on port ${port} ...`);
});