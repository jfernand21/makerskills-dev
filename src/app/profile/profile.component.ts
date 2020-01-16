import { ProfileService } from './../core/profile.service';
import { AuthService } from './../core/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core'
import { SharedService } from '../core/shared.service'
import { Skill } from '../core/domain/skill'
import { UserService } from '../core/user.service'
import { SkillsChartComponent } from '../skills-chart/skills-chart.component'
import { SeedService } from '../core/seed.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  skills: [Skill]
  agregar: boolean
  actualizar: boolean
  skillsNames: any
  expsNames: any
  levelsNames: any
  habilidadSeleccionada: string
  experienciaSeleccionada: string
  nivelSeleccionado: string
  experienciaSeleccionadaValue: number
  nivelSeleccionadoValue: number
  loading: boolean
  error: any
  indexSelected: number

  @ViewChild('skillsChart', { static: false }) chart: SkillsChartComponent

  constructor(
    public skillService: SharedService,
    public userService: UserService,
    public auth: AuthService,
    public profileService: ProfileService,
    private seed: SeedService
  ) { }

  ngOnInit() {

    this.seed.populate()

    /**************/
    this.loading = true
    this.skillService.getSkills().then(names => {
      this.skillsNames = names
      console.log(this.skillsNames)
      this.loading = false
    }).catch(err => {
      console.error(err)
      this.loading = false
    })

    this.skillService.getExps().then(names => {
      this.expsNames = names
      console.log(this.expsNames)
      this.loading = false
    }).catch(err => {
      console.error(err)
      this.loading = false
    })

    this.skillService.getLevels().then(names => {
      this.levelsNames = names
      console.log(this.levelsNames)
      this.loading = false
    }).catch(err => {
      console.error(err)
      this.loading = false
    })

    /**************/

    this.loading = true
    console.log(this.auth.userData)
    this.profileService.getSkills(this.auth.userData).then(skills => {
      this.skills = skills
      this.loading = false
    }).catch(err => {
      console.error(err)
      this.error = { message: 'Error on loading user skills, please try again.' }
      this.loading = false
    })

  }

  addItem(): void {
    let skill: Skill = new Skill()
    this.agregar = false
    console.log(!this.habilidadSeleccionada ? 'true' : 'false')
    if (!this.habilidadSeleccionada || this.habilidadSeleccionada === '' ||
      !this.experienciaSeleccionada || this.experienciaSeleccionada === '' ||
      !this.nivelSeleccionado || this.nivelSeleccionado === '') {
      console.log('Campos Vacios revisar')
    }
    else {
      skill = {
        name: this.habilidadSeleccionada,
        exp: {
          name: this.experienciaSeleccionada,
          value: 1
        },
        level: {
          name: this.nivelSeleccionado,
          value: 2
        }
      }
      this.skills.push(skill)
      this.habilidadSeleccionada = ''
      this.experienciaSeleccionada = ''
      this.nivelSeleccionado = ''
      this.profileService.addNewSkill(skill, this.auth.userData)
    }

  }

  cancelAddItem(): void {
    //controlar campos con datos
    this.agregar = false
    this.habilidadSeleccionada = ''
    this.experienciaSeleccionada = ''
    this.nivelSeleccionado = ''
  }

  selectChangeHandler(event: any) {
    //update the ui
    console.log(event)
    switch (event.target.name) {
      case "inputGroupSelectHabilidad":
        this.habilidadSeleccionada = event.target.value;
        break;
      case "inputGroupSelectExperiencia":{
        this.experienciaSeleccionada = event.target.selectedOptions[0].label;
        this.experienciaSeleccionadaValue = event.target.value;
        break;
      }
      case "inputGroupSelectNivel":
        this.nivelSeleccionado = event.target.selectedOptions[0].label;
        this.nivelSeleccionadoValue = event.target.value;
        break;
    }


  }

  deleteSkill(index: number): void {
    this.profileService.deleteSkill(this.skills[index], this.auth.userData)
    this.skills.splice(index, 1)
  }

  actualizarSkill(index: number): void {
    this.actualizar = true

  }

  ejecutarActualizarSkill(index: number): void {
    let skill: Skill = new Skill()
    console.log(this.skills);
    console.log((!this.nivelSeleccionado ))
    skill = {
      name: (!this.habilidadSeleccionada || this.habilidadSeleccionada === '') ? this.skills[index].name : this.habilidadSeleccionada,
      exp: (!this.experienciaSeleccionada || this.experienciaSeleccionada === '') ?
        {
          name: this.skills[index].exp.name,
          value: this.skills[index].exp.value
        }
        :
        {
          name: this.experienciaSeleccionada,
          value: +this.experienciaSeleccionadaValue
        },
      level: (!this.nivelSeleccionado || this.nivelSeleccionado === '') ?
      {
        name: this.skills[index].level.name,
        value: this.skills[index].level.value
      }
      :
      {
        name: this.nivelSeleccionado,
        value: +this.nivelSeleccionadoValue
      } 
    }
    this.profileService.updateSkill(skill, this.auth.userData)
    
    this.loading = true
    console.log(this.auth.userData)
    this.profileService.getSkills(this.auth.userData).then(skills => {
      this.skills = skills
      this.loading = false
    }).catch(err => {
      console.error(err)
      this.error = { message: 'Error on loading user skills, please try again.' }
      this.loading = false
    })


    this.actualizar = false
  }

}
