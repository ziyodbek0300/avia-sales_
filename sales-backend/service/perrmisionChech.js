const permissionsCheck = (array) => (req, res, next) => {
    let isHave = false
    if (array.length === 0) {
        next()
    } else {
        if (req.user) {
            array.map(arr => {
                if (arr === req.user.role) {
                    isHave = true
                }
            })
            if (isHave) {
                next()
            } else {
                res.status(405).send({code:405,error:{},message:"Not access"})
            }
        } else {
            res.status(401).send({code:401,error:{},message:"Login error"})
        }
    }
}

permissionsCheck.defaultProps = {array: []}

module.exports = permissionsCheck