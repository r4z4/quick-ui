export const student = {
    state: () => ({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        skill: '',
        company: '',
        grades: [],
    }),

    actions: {
        calcAvg( { commit, state } ){
            let grades = grades;
            let gradeLength = grades.length;

            commit( 'setGrades', grades );
            commit( 'setGrades', state.grades[ gradeLength ] );
        }
    },

    mutations: {
        setSkill( points ){
            this.state.skill = points;
        },
        setCompany( points ){
            this.state.company = points;
        },
        setGrades( song ){
            this.state.grades = song;
        }
    },

    getters: {
        getSkill( state ){
            return state.skill;
        },

        getCompany( state ){
            return state.company;
        }
    }
}
