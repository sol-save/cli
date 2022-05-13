export type GitSol = {
  "version": "0.1.0",
  "name": "git_sol",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createUserInput",
          "type": {
            "defined": "CreateUserInput"
          }
        }
      ]
    },
    {
      "name": "createRepo",
      "accounts": [
        {
          "name": "repoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createUserInput",
          "type": {
            "defined": "CreateRepoInput"
          }
        }
      ]
    },
    {
      "name": "addCommit",
      "accounts": [
        {
          "name": "repoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createCommitInput",
          "type": {
            "defined": "AddCommitInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "repoCount",
            "type": "u128"
          },
          {
            "name": "profileInfo",
            "type": {
              "defined": "ProfileInfo"
            }
          },
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "repoAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "profileInfo",
            "type": {
              "defined": "ProfileInfo"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "repoId",
            "type": "u128"
          },
          {
            "name": "remote",
            "type": "string"
          },
          {
            "name": "commits",
            "type": {
              "vec": {
                "defined": "Commit"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Commit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u128"
          },
          {
            "name": "timestamp",
            "type": "string"
          },
          {
            "name": "hash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ProfileInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "avatar",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "CreateRepoInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "avatar",
            "type": "string"
          },
          {
            "name": "remote",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "CreateUserInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "avatar",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "AddCommitInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": "string"
          },
          {
            "name": "hash",
            "type": "string"
          }
        ]
      }
    }
  ]
};

export const IDL: GitSol = {
  "version": "0.1.0",
  "name": "git_sol",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createUserInput",
          "type": {
            "defined": "CreateUserInput"
          }
        }
      ]
    },
    {
      "name": "createRepo",
      "accounts": [
        {
          "name": "repoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createUserInput",
          "type": {
            "defined": "CreateRepoInput"
          }
        }
      ]
    },
    {
      "name": "addCommit",
      "accounts": [
        {
          "name": "repoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createCommitInput",
          "type": {
            "defined": "AddCommitInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "repoCount",
            "type": "u128"
          },
          {
            "name": "profileInfo",
            "type": {
              "defined": "ProfileInfo"
            }
          },
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "repoAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "profileInfo",
            "type": {
              "defined": "ProfileInfo"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "repoId",
            "type": "u128"
          },
          {
            "name": "remote",
            "type": "string"
          },
          {
            "name": "commits",
            "type": {
              "vec": {
                "defined": "Commit"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Commit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u128"
          },
          {
            "name": "timestamp",
            "type": "string"
          },
          {
            "name": "hash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ProfileInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "avatar",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "CreateRepoInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "avatar",
            "type": "string"
          },
          {
            "name": "remote",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "CreateUserInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "avatar",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "AddCommitInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": "string"
          },
          {
            "name": "hash",
            "type": "string"
          }
        ]
      }
    }
  ]
};
