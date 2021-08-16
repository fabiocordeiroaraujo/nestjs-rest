import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ProductService } from "../product.service";

@Injectable()
@ValidatorConstraint()
export class IsCodigoUniqueConstraint implements ValidatorConstraintInterface {    

    constructor(private productService: ProductService) {
        this.productService = productService;
    }

    validate(codigo: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        // O operador !! -> Transforma em Boolean
        return !!!this.productService.recuperarPorCodigo(codigo);
    }
}

export function IsCodigoUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options:  validationOptions,
            constraints: [],
            validator: IsCodigoUniqueConstraint,
        });
    }
}