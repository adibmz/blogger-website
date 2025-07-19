import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var arr = [
  {
    id: 1,
    title: "First Blog Post",
    content: "This is the content of the first blog post. Welcome to the blog!",
    time: "Monday 1 January 2024 10:00"
  },
  {
    id: 2,
    title: "Second Blog Post",
    content: "Here is some more content in the second blog post. Enjoy reading!",
    time: "Tuesday 2 January 2024 11:30"
  },
  {
    id: 3,
    title: "Third Blog Post",
    content: "This is the third example blog post. Stay tuned for more updates!",
    time: "Wednesday 3 January 2024 14:15"
  }
];
var index = 4;

app.get("/",(req,res)=>{
    res.render("index.ejs",{arr:arr,length:arr.length})
});
app.get("/new",(req,res)=>{
    res.render("new.ejs");
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