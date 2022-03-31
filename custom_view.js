db.createView('datadog', 'customers', [{
    $lookup: {
        from: "identities",
        let: { "userRefId": "$_id" },
        pipeline: [
            {
                $match: {
                    $expr: { $eq: ["$customer", "$$userRefId"] }
                }
            },
            {
                $project: {
                    _id: 1,
                    reason: 1,
                    service: 1,
                    state: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            },

        ],
        as: "identity"
    }
},
{
    $lookup: {
        from: "stakes",
        let: { "categoryRefId": "$_id" },
        pipeline: [
            {
                $match: {
                    $expr: { $eq: ["$customer", "$$categoryRefId"] }
                }
            },{    
            $lookup: {
                from: "projects",
                let: { "projectRefId": "$project" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$projectRefId"] }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            slug: 1,
                            name: 1,
                            poolOpenDate: 1,
                            ended: 1,
                            canJoin: 1,
                            currency: 1,
                            contractAddress: 1,
                            totalRaise: 1,
                            token: 1,
                            social: 1,
                            pools: 1,
                            brand: 1,
                            restrictedCountries: 1,
                            announcementDate: 1,
                            status: 1
                        
                        }
                    }
                ],
                as: "projects"
            }},
            {
                $project: {
                    _id: 1,
                    projects: 1,
                    unstaked: 1,
                    wallet: 1,
                    stakedAt: 1,
                    unstakeAt: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ],
        as: "stakes"
    },
},
{
    $project: {
        _id: 1,
        email: 1,
        country: 1,
        brand: 1,
        wallets: 1,
        telegram: 1,
        stakes: 1,
        identity: 1
    }
}])
