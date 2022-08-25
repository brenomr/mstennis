import { ChallengeStatus } from '../interfaces/challenges.interface';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ValidateChallengeStatusPipe implements PipeTransform {
  readonly allowedStatus = [
    ChallengeStatus.ACCEPTED,
    ChallengeStatus.NEGATED,
    ChallengeStatus.CANCELED,
  ];

  transform(value: any) {
    const status = value.status?.toUpperCase();
    if (status && this.statusIsInvalid(status)) {
      throw new BadRequestException(
        `${status} isn't a valid status. Options are: ${this.allowedStatus}.`,
      );
    }
    return value;
  }

  private statusIsInvalid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx === -1;
  }
}
