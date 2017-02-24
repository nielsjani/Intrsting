import {Input, Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TagService} from "../../service/tag.service";
import {notEmpty} from "../../validator/NotEmptyValidator";
import {Tag} from "../../class/tag.class";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'tag-component',
  templateUrl: './tag.component.html'
})
export class TagComponent {
  @Input()
  intrstingId;

  addingTag = false;
  private addTagForm: FormGroup;
  private existingTags: Tag[] = [];

  constructor(private tagService: TagService, private formBuilder: FormBuilder, private userService: UserService) {
    this.addTagForm = this.formBuilder.group({
      name: new FormControl("", notEmpty)
    });
  }

  ngOnInit() {
    this.fetchTags();
  }

  addTag() {
    this.addingTag = true;
  }

  submitForm() {
    this.addingTag = false;
    let newTag: Tag = this.addTagForm.value;
    if (this.tagAlreadyPresent(newTag)) {
      this.addTagForm.reset();
      this.addingTag = false;
      return;
    }
    newTag.intrsthingId = this.intrstingId;
    this.userService.getLoggedInUser()
      .then(username => {
        newTag.creator = username;
        this.tagService.createTag(newTag)
          .subscribe(() => {
            this.fetchTags();
            this.addTagForm.reset();
            this.addingTag = false;
          });
      })
  }

  private tagAlreadyPresent(newTag: Tag) {
    return this.existingTags.some(tag => tag.name.toLowerCase().trim() === newTag.name.toLowerCase().trim());
  }


  private fetchTags() {
    this.tagService.getTagsFor(this.intrstingId)
      .subscribe(tags => {
        this.existingTags = tags.sort((tag1, tag2) => this.compare(tag1, tag2))
      })
  }

  private compare(tag1: Tag, tag2: Tag) {
    if(tag1.name < tag2.name){
      return -1;
    }
    if(tag1.name > tag2.name){
      return 1;
    }
    return 0;
  }
}
