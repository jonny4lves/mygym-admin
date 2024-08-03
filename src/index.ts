import 'express-async-errors'
import { AppDataSource } from "./data-source"
import express from 'express'
import routes from "./routes/index";

import { errorMiddleware } from "./middlewares/Error";
import AcessoService from "./services/AcessoService";

AppDataSource.initialize().then(async () => {
    
    await AcessoService.insereAcessosNoBanco();

    const app = express();
    routes(app);

    const server = "http://localhost"
    const port = 3000;

    app.use(errorMiddleware);

    return app.listen(port, ()=>{
        console.log(`🔥Server running in ${server}:${port}`)
    })

}).catch(error => console.log(error))
