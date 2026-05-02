import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HomeModule } from './shared/home/home.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppHttpService } from './core/services/http.service';
import { MasterService } from './core/services/master.service';
import { faAdd, faArrowLeft, faBars,faChevronDown, faCheckCircle,faUser,faHouse, faClose,faCheck, faEdit,faHistory, 
  faEye, faGear, faPen, faRepeat, faRightLeft, faSave, faSearch, faSearchPlus, faTrash,faArrowsSplitUpAndLeft, faBackward, faTimesCircle, faSearchMinus, faArrowRight, 
  faCalendarAlt, faPaperPlane, faBan, faTh, faBarcode, faQrcode, faDownload, faFileUpload, faFile, faFileImport, faProjectDiagram, faLayerGroup, 
  faPrint, faCircleExclamation, 
  faExclamation} from '@fortawesome/free-solid-svg-icons';
import { AppPaginationService } from './shared/globalShared/appPagination/appPagination.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeModule,
    FontAwesomeModule
],
  providers: [
    AppHttpService,
    MasterService,
    AppPaginationService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mottosysqrcsclient';

  constructor(private library: FaIconLibrary) { }

  ngOnInit(): void {

    let bodyClass : string = 'qrcs-theme';

    document.body.classList.add(bodyClass);

    this.library.addIcons(faEdit, faClose, faArrowLeft, faSave,faUser,faHouse, faBars,faChevronDown,faArrowsSplitUpAndLeft, faTimesCircle,faSearchMinus,
      faPen, faGear, faAdd, faCheckCircle, faSearch, faSearchPlus, faEye,faCheck, faTrash,faRepeat,faRightLeft,faHistory, faBackward, 
      faArrowRight, faCalendarAlt, faPaperPlane, faBan, faTh,faBarcode,faQrcode, faDownload, faFileUpload,faFile,faFileImport, faProjectDiagram, 
      faLayerGroup, faPrint, faCircleExclamation, faExclamation);
  }
}
