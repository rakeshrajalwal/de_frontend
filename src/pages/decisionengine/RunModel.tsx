import * as React from 'react';
import { render } from 'react-dom';
import { useCreateModelMutation  , useGetAllProductsQuery} from '../../redux/de';
import { useEffect } from 'preact/hooks';

// import './styles.css';



const RunModel = () => {
  var formData =
  {
    "name": "m-test",
    "product": "Working Capital Loan",
    "policy": {
      "loanRange": {
        "min": 1000,
        "max": 5000
      },
      "loanTermInMonths": {
        "min": 24,
        "max": 30
      },
      "loanPurpose": [
        "expansion"
      ],
      "isSecured": true
    },
    "factors": [
      {
        "name": "Financial Strength",
        "weight": 88,
        "subFactors": [
          {
            "name": "Market Conditions ",
            "weight": 34,
            "signals": [
              {
                "name": "GP%vsSector",
                "weight": 70,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "NP%vsSector",
                "weight": 15,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "LeverageVsSector",
                "weight": 14,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "GearingVsSector",
                "weight": 1,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              }
            ]
          },
          {
            "name": "Debt Service",
            "weight": 55,
            "signals": [
              {
                "name": "EBIDTA:DSC",
                "weight": 100,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              }
            ]
          },
          {
            "name": "Financial Stability",
            "weight": 10,
            "signals": [
              {
                "name": "%ChgTurnover",
                "weight": 70,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "EBIDTA%ratio",
                "weight": 29,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "Stressed EBIDTA:DSC",
                "weight": 0,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "%ChgRetainedProfits",
                "weight": 1,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              }
            ]
          },
          {
            "name": "Gearing ratio",
            "weight": 0,
            "signals": [
              {
                "name": "Gearing",
                "weight": 100,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              }
            ]
          },
          {
            "name": "Leverage",
            "weight": 1,
            "signals": [
              {
                "name": "Leverage",
                "weight": 100,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "Strength of Business Owner/Guarantor & Security Package",
        "weight": 9,
        "subFactors": [
          {
            "name": "Financial Capacity & Willingness to Support",
            "weight": 100,
            "signals": [
              {
                "name": "Sponsors Debt",
                "weight": 60,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "Sponsors Net Worth",
                "weight": 12,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "Sponsor Credit Score",
                "weight": 4,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              },
              {
                "name": "Business Interuption Insurance",
                "weight": 24,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "Transaction Characteristics ",
        "weight": 3,
        "subFactors": [
          {
            "name": "Term of Loan vs. Purpose",
            "weight": 100,
            "signals": [
              {
                "name": "TermvsPurpose",
                "weight": 100,
                "criteria": {
                  "strong": {
                    "min": 200,
                    "max": 300
                  },
                  "good": {
                    "min": 100,
                    "max": 200
                  },
                  "satisfactory": {
                    "min": 10,
                    "max": 100
                  },
                  "weak": {
                    "min": 0,
                    "max": 10
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
   const { data, error, isLoading } = useGetAllProductsQuery();
  // const [addNewPost, response] = useCreateModelMutation();
  // var value = JSON.stringify(formData, null, 2);
  // useEffect(() => {
  //   addNewPost(value)
  //     .unwrap()
  //     .then(() => { })
  //     .then((error) => {
  //       console.log(error)
  //     })
  // }, [])

 // console.log(data, " the data")
  return (
    // <UserList />
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (

        data.map((p) => <h3 key={p.name}> {p.name}  </h3>)

      ) : null}
    </div>
  );
}

export default RunModel;