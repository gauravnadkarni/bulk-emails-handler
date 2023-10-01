import { Module } from '@nestjs/common';
import Utility from './utility';

@Module({
    providers:[Utility],
    exports:[Utility],
})
export class UtilityModule {}
