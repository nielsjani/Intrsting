
export class Review {
  id: string; // only filled in after persisting
  intristingId: string; //foreign key
  rating: number;
  rater: string; //username of poster
  comment: string; //optional
}
