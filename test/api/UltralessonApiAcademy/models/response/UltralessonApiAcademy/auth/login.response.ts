import { BaseResponse } from "../../base.response"

export interface LoginResponseBody extends BaseResponse {
    data: Data
}

interface Data {
    user: User
    session: Session
}

interface User {
    id: string
    aud: string
    role: string
    email: string
    email_confirmed_at: string
    phone: string
    confirmed_at: string
    last_sign_in_at: string
    app_metadata: AppMetadata
    user_metadata: UserMetadata
    identities: Identity[]
    created_at: string
    updated_at: string
}

interface AppMetadata {
    provider: string
    providers: string[]
}

interface UserMetadata { }

interface Identity {
    identity_id: string
    id: string
    user_id: string
    identity_data: IdentityData
    provider: string
    last_sign_in_at: string
    created_at: string
    updated_at: string
    email: string
}

interface IdentityData {
    email: string
    email_verified: boolean
    phone_verified: boolean
    sub: string
}

interface Session {
    access_token: string
    token_type: string
    expires_in: number
    expires_at: number
    refresh_token: string
    user: User
}

export const loginResponseSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "data": {
            "type": "object",
            "properties": {
                "user": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "aud": {
                            "type": "string"
                        },
                        "role": {
                            "type": "string"
                        },
                        "email": {
                            "type": "string"
                        },
                        "email_confirmed_at": {
                            "type": "string"
                        },
                        "phone": {
                            "type": "string"
                        },
                        "confirmed_at": {
                            "type": "string"
                        },
                        "last_sign_in_at": {
                            "type": "string"
                        },
                        "app_metadata": {
                            "type": "object",
                            "properties": {
                                "provider": {
                                    "type": "string"
                                },
                                "providers": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "required": [
                                "provider",
                                "providers"
                            ]
                        },
                        "user_metadata": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                },
                                "email_verified": {
                                    "type": "boolean"
                                },
                                "phone_verified": {
                                    "type": "boolean"
                                },
                                "sub": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "email",
                                "email_verified",
                                "phone_verified",
                                "sub"
                            ]
                        },
                        "identities": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "identity_id": {
                                        "type": "string"
                                    },
                                    "id": {
                                        "type": "string"
                                    },
                                    "user_id": {
                                        "type": "string"
                                    },
                                    "identity_data": {
                                        "type": "object",
                                        "properties": {
                                            "email": {
                                                "type": "string"
                                            },
                                            "email_verified": {
                                                "type": "boolean"
                                            },
                                            "phone_verified": {
                                                "type": "boolean"
                                            },
                                            "sub": {
                                                "type": "string"
                                            }
                                        },
                                        "required": [
                                            "email",
                                            "email_verified",
                                            "phone_verified",
                                            "sub"
                                        ]
                                    },
                                    "provider": {
                                        "type": "string"
                                    },
                                    "last_sign_in_at": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string"
                                    },
                                    "updated_at": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "identity_id",
                                    "id",
                                    "user_id",
                                    "identity_data",
                                    "provider",
                                    "last_sign_in_at",
                                    "created_at",
                                    "updated_at",
                                    "email"
                                ]
                            }
                        },
                        "created_at": {
                            "type": "string"
                        },
                        "updated_at": {
                            "type": "string"
                        },
                        "is_anonymous": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "id",
                        "aud",
                        "role",
                        "email",
                        "email_confirmed_at",
                        "phone",
                        "confirmed_at",
                        "last_sign_in_at",
                        "app_metadata",
                        "user_metadata",
                        "identities",
                        "created_at",
                        "updated_at",
                        "is_anonymous"
                    ]
                },
                "session": {
                    "type": "object",
                    "properties": {
                        "access_token": {
                            "type": "string"
                        },
                        "token_type": {
                            "type": "string"
                        },
                        "expires_in": {
                            "type": "number"
                        },
                        "expires_at": {
                            "type": "number"
                        },
                        "refresh_token": {
                            "type": "string"
                        },
                        "user": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                },
                                "aud": {
                                    "type": "string"
                                },
                                "role": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                                "email_confirmed_at": {
                                    "type": "string"
                                },
                                "phone": {
                                    "type": "string"
                                },
                                "confirmed_at": {
                                    "type": "string"
                                },
                                "last_sign_in_at": {
                                    "type": "string"
                                },
                                "app_metadata": {
                                    "type": "object",
                                    "properties": {
                                        "provider": {
                                            "type": "string"
                                        },
                                        "providers": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "required": [
                                        "provider",
                                        "providers"
                                    ]
                                },
                                "user_metadata": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string"
                                        },
                                        "email_verified": {
                                            "type": "boolean"
                                        },
                                        "phone_verified": {
                                            "type": "boolean"
                                        },
                                        "sub": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "email",
                                        "email_verified",
                                        "phone_verified",
                                        "sub"
                                    ]
                                },
                                "identities": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "identity_id": {
                                                "type": "string"
                                            },
                                            "id": {
                                                "type": "string"
                                            },
                                            "user_id": {
                                                "type": "string"
                                            },
                                            "identity_data": {
                                                "type": "object",
                                                "properties": {
                                                    "email": {
                                                        "type": "string"
                                                    },
                                                    "email_verified": {
                                                        "type": "boolean"
                                                    },
                                                    "phone_verified": {
                                                        "type": "boolean"
                                                    },
                                                    "sub": {
                                                        "type": "string"
                                                    }
                                                },
                                                "required": [
                                                    "email",
                                                    "email_verified",
                                                    "phone_verified",
                                                    "sub"
                                                ]
                                            },
                                            "provider": {
                                                "type": "string"
                                            },
                                            "last_sign_in_at": {
                                                "type": "string"
                                            },
                                            "created_at": {
                                                "type": "string"
                                            },
                                            "updated_at": {
                                                "type": "string"
                                            },
                                            "email": {
                                                "type": "string"
                                            }
                                        },
                                        "required": [
                                            "identity_id",
                                            "id",
                                            "user_id",
                                            "identity_data",
                                            "provider",
                                            "last_sign_in_at",
                                            "created_at",
                                            "updated_at",
                                            "email"
                                        ]
                                    }
                                },
                                "created_at": {
                                    "type": "string"
                                },
                                "updated_at": {
                                    "type": "string"
                                },
                                "is_anonymous": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "id",
                                "aud",
                                "role",
                                "email",
                                "email_confirmed_at",
                                "phone",
                                "confirmed_at",
                                "last_sign_in_at",
                                "app_metadata",
                                "user_metadata",
                                "identities",
                                "created_at",
                                "updated_at",
                                "is_anonymous"
                            ]
                        }
                    },
                    "required": [
                        "access_token",
                        "token_type",
                        "expires_in",
                        "expires_at",
                        "refresh_token",
                        "user"
                    ]
                }
            },
            "required": [
                "user",
                "session"
            ]
        }
    },
    "required": [
        "data"
    ]
}
