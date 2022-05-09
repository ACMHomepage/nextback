import { InputType, Field, PartialType } from '@nestjs/graphql';
import { NewsInput } from './newsInput';

/**
 * Make sure this input type looks like `./newsInput`
 */
@InputType()
export class PartialNewsInput extends PartialType(NewsInput) {}
