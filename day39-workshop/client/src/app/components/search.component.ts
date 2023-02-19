import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nameStartsWith: this.fb.control('', [Validators.required]),
    });
  }

  submitForm(): void {
    // on submit route to characters?nameStartWith=spider
    const nameStartsWith = this.form.get('nameStartsWith')?.value;
    this.router.navigate(['characters'], {
      queryParams: {
        nameStartsWith: nameStartsWith,
      },
    });
  }
}
