import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  IsNumber,
  IsInt,
  ArrayContains,
  ArrayUnique,
  ArrayNotContains,
  ArrayMaxSize,
  IsArray,
  Allow,
  IsAlpha,
  MinLength,
  IsPositive,
  IsAscii,
  IsCreditCard,
  IsHexColor,
  IsDataURI,
  IsIpVersion,
  Length,
  Contains,
  IsFQDN,
  IsDate,
  IsAlphanumeric,
  IsBtcAddress,
  IsMACAddress,
  IsMagnetURI,
  IsOctal,
  IsBase32,
  IsEnum,
  IsPostalCode,
  IsUrl,
  IsJSON,
  IsJWT,
  IsLowercase,
  IsUppercase,
  IsUUID,
  IsPhoneNumber,
  IsMongoId,
  IsBase64,
  ArrayNotEmpty, IsIP,
} from 'class-validator';

enum Enum {
  s,
}

export class CreateClientDto {
  /*
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;*/

  @IsPositive()
  @IsAscii()
  @IsCreditCard()
  @IsHexColor()
  @IsDataURI()
  @IsIP()
  @MinLength(10)
  @ArrayNotEmpty()
  @IsAlphanumeric()
  @IsBtcAddress()
  @IsMACAddress()
  @IsMagnetURI()
  @IsOctal()
  @IsBase64()
  @IsBase32()
  @IsEnum(Enum)
  @Length(10, 20)
  @Contains('hello')
  @IsFQDN()
  @IsDate()
  @IsNumber()
  @IsNumber()
  @IsInt()
  @ArrayContains([])
  @ArrayUnique()
  @ArrayNotEmpty()
  @ArrayNotContains([])
  @ArrayMaxSize(10)
  @IsArray()
  @Allow()
  @IsAlpha()
  @IsAlphanumeric()
  @IsBtcAddress()
  @IsMACAddress()
  @IsMagnetURI()
  @IsOctal()
  @IsBase64()
  @IsBase32()
  @IsEnum(Enum)
  @IsMongoId()
  @IsPhoneNumber()
  @IsPostalCode()
  @IsUUID(6)
  @IsUrl()
  @IsJSON()
  @IsJWT()
  @IsLowercase()
  @IsUppercase()
  @IsEmail()
  @IsFQDN()
  test: any;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsBoolean()
  subscribeToEmail: boolean;

  @Min(5)
  min: number;

  @Max(10)
  max: number;
}
