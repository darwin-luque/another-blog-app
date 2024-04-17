export type IClerkUserResponse = {
  id: string;
  object: string;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
  has_image: boolean;
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id?: string | null;
  password_enabled: boolean;
  two_factor_enabled: boolean;
  totp_enabled: boolean;
  backup_code_enabled: boolean;
  email_addresses: Emailaddress[];
  phone_numbers: string[];
  web3_wallets: string[];
  passkeys: string[];
  external_accounts: Externalaccount[];
  saml_accounts: string[];
  public_metadata: Publicmetadata;
  private_metadata: Publicmetadata;
  unsafe_metadata: Publicmetadata;
  external_id: string | null;
  last_sign_in_at: number;
  banned: boolean;
  locked: boolean;
  lockout_expires_in_seconds?: string;
  verification_attempts_remaining: number;
  created_at: number;
  updated_at: number;
  delete_self_enabled: boolean;
  create_organization_enabled: boolean;
  last_active_at: number;
  profile_image_url: string;
};

export type Externalaccount = {
  object: string;
  id: string;
  provider: string;
  identification_id: string;
  provider_user_id: string;
  approved_scopes: string;
  email_address: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  image_url: string;
  username: string;
  public_metadata: Publicmetadata;
  label: string | null;
  created_at: number;
  updated_at: number;
  verification: Verification2;
};

export type Verification2 = {
  status: string;
  strategy: string;
  attempts: number | null;
  expire_at: number;
};

export type Publicmetadata = Record<string, unknown>;

export type Emailaddress = {
  id: string;
  object: string;
  email_address: string;
  reserved: boolean;
  verification: Verification;
  linked_to: Linkedto[];
  created_at: number;
  updated_at: number;
};

export type Linkedto = {
  type: string;
  id: string;
};

export type Verification = {
  status: string;
  strategy: string;
  attempts?: number;
  expire_at?: number;
};