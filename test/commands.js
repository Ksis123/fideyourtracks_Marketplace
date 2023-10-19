const instance = await NftMarket.deployed();

instance.mintToken("https://salmon-charming-stingray-66.mypinata.cloud/ipfs/QmU4CzgNmAAyALSc1xV23netcMyCUM9NLcNmMqxk2sMC1s?_gl=1*1wl5srv*_ga*MTE0ODI0Mjc0LjE2OTY4NjQ2MTU.*_ga_5RMPXG14TE*MTY5Njk2Nzg5Ni40LjEuMTY5Njk2ODIwNC4zNS4wLjA.","500000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("https://salmon-charming-stingray-66.mypinata.cloud/ipfs/QmYhUu7SGEkXjj7q4DUdJbNurXTsiY56K5gDJWiBWGk1b7?_gl=1*1wl5srv*_ga*MTE0ODI0Mjc0LjE2OTY4NjQ2MTU.*_ga_5RMPXG14TE*MTY5Njk2Nzg5Ni40LjEuMTY5Njk2ODIwNC4zNS4wLjA.","300000000000000000", {value: "25000000000000000",from: accounts[0]})