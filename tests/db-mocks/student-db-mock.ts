let mockStudentDbModel = {
    findByPk: (pk: any) => {
        return {
            id: 1,
            first_name: "Neeraj",
            last_name: "Jadhav",
            dateOfBirth: "1987-08-28"
        }
    },
    findAll: (item: any) => {
        return [
            {
                id: 1,
                first_name: "Neeraj",
                last_name: "Jadhav",
                dateOfBirth: "1987-08-28"
            },
            {
                id: 2,
                first_name: "Neeraj",
                last_name: "Jadhav",
                dateOfBirth: "1987-08-28"
            },
            {
                id: 3,
                first_name: "Neeraj",
                last_name: "Jadhav",
                dateOfBirth: "1987-08-28"
            }
        ]
    },
    create: (item: any) => {
        return {
            id: 1,
            first_name: "Neeraj",
            last_name: "Jadhav",
            dateOfBirth: "1987-08-28"
        }
    },
    update: (item: any) => {
        return 1;
    },
    destroy: (item: any) => {
        return 1;
    }
}

export default mockStudentDbModel;