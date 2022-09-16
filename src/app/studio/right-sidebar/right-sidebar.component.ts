import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, ViewEncapsulation, ElementRef } from '@angular/core';
import { StudioService } from '../services/studio.service';
import { PropertyPageComponent } from './property-page/property-page.component';
import { UiElement } from '../models/UiElement.model';
import colors from './data/colors.json'
import fill from './data/fill.json';
import enterkeyhint from './data/enterkeyhint.json';
import expand from './data/expand.json';
import inputmode from './data/inputmode.json';
import label from './data/label.json';
import size from './data/size.json';
import typeinput from './data/typeInput.json';
import wrap from './data/wrap.json'
import fontsize from './data/font-size.json';
import align from './data/align.json';
import { PageRequest } from '../../core/model/page-request.model';
const _childExclusions= ['ion-input'];
@Component({
  selector: 'ng-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent implements OnInit {

  @Input() showMe: boolean;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('attributes') private ElementAttribute: ElementRef;
  element: UiElement = null;
  page:ElementRef=null;
  components = [];
  draggableComponent1 = PropertyPageComponent;

  exclusions = [..._childExclusions];
  colorsArray = colors;
  expandArray =expand;
  fillArray=fill
  sizeArray=size;
  alignArray=align;
  fontsizeArray=fontsize;
  labelArray=label;
  wrapArray=wrap;
  inputmodeArray=inputmode;
  enterkeyhintArray=enterkeyhint;
  typeInputArray =typeinput;

  constructor(private studioService:StudioService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    studioService.myBool$.subscribe((newBool: boolean) => { this.showMe = newBool; });
   }


  ngOnInit() {
    this.studioService.elementClickedNotify().subscribe(element=> {
      console.log('element clicked', element.type);
      this.element = element;
      this.studioService.setRunning(true);
    }, error => {
      console.error('error getting element clicked')
    })
  }


  changeAttr($event, name) {
    console.log('element attr name ::::: ', name);
    console.log('element attr ::::' , $event);
    this.element.attributes[this.element.attributes.indexOf(this.element.attributes.find(attr=>attr.name === name))].value=$event;

    // this.element.attributes = this.element.attributes.map(attr => {
    //  return {
    //    name: attr.name,
    //    value: attr.name === name ? $event : attr.value
    //  }
    // });

    console.warn('ELEMENT AFTER CHANGE ::' , this.element);

    // this.studioService.notifyOfElementChanged()
    this.studioService.notifyOfElementChanged(this.element);
  }
  changeClass($event,cl) {
    this.element.classes[this.element.classes.indexOf(this.element.classes.find(c=>c=== cl))] = $event;
    //this.element.classes[this.element.classes.indexOf(cl)]=$event;

    console.log('class ::::' ,cl);
    console.log('element class ::::' , $event);
    console.warn('ELEMENT AFTER CHANGE ::' , this.element);
    this.studioService.notifyOfElementChanged(this.element);
  }


  isExcluded(el: UiElement) {
    console.log('checking')
    return this.exclusions.includes(el.type);
  }

  changeText($event) {
    this.element.children[0] = $event;
    console.log('element text ::::' , $event);
    console.warn('ELEMENT AFTER CHANGE ::' , this.element);
    this.studioService.notifyOfElementChanged(this.element);
  }
  elements:UiElement[];

  remove($event,el) {
    this.element=el;
    console.log('element  ::::: ', el);
    console.log('element attr ::::' , $event);
    this.studioService.notifyOfElementSelected(this.element);
    this.studioService.setRunning(false);

  }


}
