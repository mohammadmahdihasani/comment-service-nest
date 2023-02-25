import { MongooseModule } from '@nestjs/mongoose';

export const mongoConfig = MongooseModule.forRoot(process.env.DATBASE_URL);
