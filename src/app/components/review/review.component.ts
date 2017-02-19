import {Input, Component} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {ReviewService} from "../../service/review.service";
import {Review} from "../../class/review.class";

@Component({
  selector: 'review-component',
  templateUrl: './review.component.html'
})
export class ReviewComponent {
  @Input()
  intrstingId;

  isReviewing: boolean = false;
  score: number = 0;
  private reviewForm;
  private existingReviews: Review[] = [];

  constructor(private formBuilder: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = formBuilder.group({
      comment: new FormControl("")
    });
  }

  ngOnInit() {
    this.refreshReviewList();
  }

  startReviewing() {
    this.isReviewing = true;
  }

  stopReviewing() {
    this.isReviewing = false;
  }

  changeScore(newScore: number) {
    if (this.score === newScore && newScore === 1) {
      this.score = 0;
    } else {
      this.score = newScore;
    }
  }

  submitForm() {
    this.stopReviewing();
    let completeReview = this.enhanceReview(this.reviewForm.value);
    this.reviewService.postReview(completeReview)
      .subscribe(res => this.refreshReviewList());
  }

  getStarIconName(iconScore: number) {
    return iconScore <= this.score ? "star" : "star-outline";
  }

  getStarIconNameForExisting(scoreToCompareAgainst: number, reviewScore: number) {
    return reviewScore >= scoreToCompareAgainst ? "star" : "star-outline";
  }

  private enhanceReview(incompleteReview: Review): Review {
    incompleteReview.rating = this.score;
    incompleteReview.rater = "NIELSJ";
    incompleteReview.intristingId = this.intrstingId;
    return incompleteReview;
  }

  private refreshReviewList() {
    this.reviewService
      .getReviewsForIntrsthing(this.intrstingId)
      .subscribe(reviews => this.existingReviews = reviews)
  }
}
