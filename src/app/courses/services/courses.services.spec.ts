import { COURSES, findLessonsForCourse } from './../../../../server/db-data';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Course } from '../model/course';
import { CoursesService } from './courses.service';
import { HttpErrorResponse } from '@angular/common/http';


describe(`${CoursesService.name}`, () => {

    let coursesServices: CoursesService,
        httpTestingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService,

            ]
        })

        coursesServices = TestBed.inject<CoursesService>(CoursesService)
        httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController)
    })

    it(`#${CoursesService.prototype.findAllCourses.name} should return all courses`, () => {
        coursesServices.findAllCourses().subscribe(courses => {
            expect(courses).toBeTruthy("No courses returned")
            expect(courses.length).toBe(12, "Incorrect number of courses")

            const course = courses.find(course => course.id === 12)
            expect(course.titles.description).toEqual("Angular Testing Course", "Title is not the same was expected")
        });

        const req = httpTestingController.expectOne("/api/courses")

        expect(req.request.method).toEqual("GET", "Method request is not 'GET'")

        req.flush({ payload: Object.values(COURSES) })

    })

    it(`#${CoursesService.prototype.findCourseById.name} should find a course by id`, () => {
        const idToFind = 12
        coursesServices.findCourseById(idToFind).subscribe(course => {
            expect(course).toBeTruthy()
            expect(course.id).toBe(idToFind)
        })

        const req = httpTestingController.expectOne('/api/courses/12')
        expect(req.request.method).toEqual("GET")
        req.flush(COURSES[12])
    })

    it(`#${CoursesService.prototype.saveCourse.name} should save the course data`, () => {

        const changes: Partial<Course> = { titles: { description: "Testing course" } }
        // Parametros -> 1º: ID que deseja modificar | 2º: Propriedade que deseja modificar
        coursesServices.saveCourse(12, changes)
            .subscribe(course => {
                expect(course).toBeTruthy("No course found.")
                expect(course.id).toBe(12, "ID course is not same was expected")
                expect(course.titles.description).toEqual(changes.titles.description, "Course description is not same was expected")
            })

        const req = httpTestingController.expectOne("/api/courses/12");
        expect(req.request.method).toEqual("PUT", "Method request is not same was expected")
        expect(req.request.body.titles.description).toEqual(changes.titles.description, "Body of request is not same was expected")

        req.flush({
            ...COURSES[12],
            ...changes
        })
    })

    it(`#${CoursesService.prototype.saveCourse.name} should give error id save course fails`, () => {
        const changes: Partial<Course> = { titles: { description: "Testing course" } }
        coursesServices.saveCourse(12, changes).subscribe(
            _ => fail("The save course operation should have fail"),
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(500, "Status code error is different the expected")
                expect(error.statusText).toEqual("Internal Server Error")
            }
        );
        const req = httpTestingController.expectOne("/api/courses/12", "Request was no called")
        expect(req.request.method).toEqual("PUT", "Method request is not same was expected")
        req.flush('Save course failed', { status: 500, statusText: "Internal Server Error" })
    })

    it(`#${CoursesService.prototype.findLessons.name} should find a list of lessons`, () => {
        coursesServices.findLessons(12).subscribe(lessons => {
            expect(lessons).toBeTruthy("No lessons returned")
            expect(lessons.length).toBe(3, "Qty of lessons is not same was expected")
        })
        
        const req = httpTestingController.expectOne(req => req.url === '/api/lessons')
        
        expect(req.request.method).toEqual("GET")
        expect(req.request.params.get("courseId")).toEqual("12", "Params 'courseId' is not was expected")
        expect(req.request.params.get("filter")).toEqual("")
        expect(req.request.params.get("sortOrder")).toEqual("asc")
        expect(req.request.params.get("pageNumber")).toEqual("0")
        expect(req.request.params.get("pageSize")).toEqual("3")

        req.flush({
            payload: findLessonsForCourse(12).slice(0, 3)
        })
    })

    afterEach(() => {
        httpTestingController.verify()
    })
})