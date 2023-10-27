import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { CanvasComponent } from './canvas/canvas.component'
import { MenuComponent } from './menu/menu.component'

describe('AppComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent, CanvasComponent, MenuComponent],
        })
    )

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app).toBeTruthy()
    })

    it(`should have as title 'game_of_life'`, () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app.title).toEqual('game_of_life')
    })

    it('should have a canvas', () => {
        const fixture = TestBed.createComponent(AppComponent)
        fixture.detectChanges()
        const compiled = fixture.nativeElement as HTMLElement
        expect(compiled.querySelector('canvas')).toBeTruthy()
    })
})
