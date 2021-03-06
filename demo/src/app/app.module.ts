import { DataService } from "./services/data.service";
import { HelloComponent } from "./components/hello/hello.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { HiComponent } from "./components/hi/hi.component";

import { CKEditorModule } from "ngx-ckeditor";

@NgModule({
  declarations: [AppComponent, HelloComponent, HiComponent],
  imports: [CKEditorModule, BrowserModule, FormsModule, HttpModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
