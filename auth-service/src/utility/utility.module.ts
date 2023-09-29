import { Module } from '@nestjs/common';
import Utility from './utiltity';

@Module({
    providers:[Utility],
    exports:[Utility],
})
export class UtilityModule {}
