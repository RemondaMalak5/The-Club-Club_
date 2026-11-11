const GUEST_KEYWORDS = [
  "guest",
  "non-member",
  "non_member",
  "non member",
  "visitor",
  "ضيف",
  "زائر",
  "غير عضو",
  "بدون عضوية",
];

const MEMBER_KEYWORDS = [
  "member",
  "primary",
  "dependant",
  "dependent",
  "family",
  "عضو",
  "عامل",
  "تابع",
  "عائلية",
];

const readStoredJson = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const matchesAnyKeyword = (value, keywords) => {
  if (!value || typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;
  return keywords.some((kw) => normalized.includes(kw));
};

/**
 * Determines whether the user is a Guest (non-member) based on profile/login/stored objects.
 */
export const isGuestUser = (...sources) => {
  const storedUser = readStoredJson("user");
  const storedCustomer = readStoredJson("customer");
  const storedAccountType = localStorage.getItem("accountType");

  const candidates = [
    ...sources.filter((s) => s && typeof s === "object"),
    storedUser,
    storedCustomer,
  ].filter(Boolean);

  // 1. Check explicit boolean flags first
  for (const item of candidates) {
    if (item.isGuest === true || item.is_guest === true) return true;
    if (item.isMember === false || item.is_member === false) return true;
    if (item.isGuest === false || item.is_guest === false) return false;
    if (item.isMember === true || item.is_member === true) return false;
  }

  // 2. Check explicit type/role/group string fields
  const typeFields = [
    "userType",
    "user_type",
    "accountType",
    "account_type",
    "customerType",
    "customer_type",
    "customerGroup",
    "customer_group",
    "membershipType",
    "membership_type",
    "subscriberType",
    "subscriber_type",
    "role",
    "type",
  ];

  for (const item of candidates) {
    for (const field of typeFields) {
      const val = item?.[field];
      if (matchesAnyKeyword(val, GUEST_KEYWORDS)) {
        return true;
      }
    }
  }

  // 3. Check active membership identifiers (if user has a real membership number, they are a Member)
  for (const item of candidates) {
    const membershipIdentifier =
      item?.membershipNo ||
      item?.membershipId ||
      item?.membership_no ||
      item?.membership_id ||
      item?.card_number ||
      item?.memberId ||
      item?.member_id;

    if (
      membershipIdentifier &&
      String(membershipIdentifier).trim() !== "" &&
      !matchesAnyKeyword(String(membershipIdentifier), GUEST_KEYWORDS)
    ) {
      return false;
    }

    for (const field of typeFields) {
      const val = item?.[field];
      if (
        matchesAnyKeyword(val, MEMBER_KEYWORDS) &&
        !matchesAnyKeyword(val, GUEST_KEYWORDS)
      ) {
        return false;
      }
    }
  }

  // 4. Check stored registration/login accountType hint
  if (storedAccountType === "guest") return true;
  if (storedAccountType === "member") return false;

  // 5. If full profile payload is loaded (has profile keys) and lacks any membershipNo/membershipType, treat as Guest
  const fullProfile = candidates.find(
    (item) =>
      "digitalCard" in item ||
      "outstandingSubscriptions" in item ||
      "familyMembers" in item ||
      "membershipNo" in item ||
      "membershipType" in item
  );

  if (fullProfile) {
    const hasMembership = Boolean(
      fullProfile.membershipNo ||
        fullProfile.membershipId ||
        (fullProfile.membershipType &&
          !matchesAnyKeyword(fullProfile.membershipType, [
            ...GUEST_KEYWORDS,
            "not available",
            "غير متاح",
            "none",
          ]))
    );
    return !hasMembership;
  }

  return false;
};

/**
 * Returns "/guest" when the logged-in user is a Guest, or "/profile" when a Member.
 */
export const getUserDashboardPath = (...sources) => {
  return isGuestUser(...sources) ? "/guest" : "/profile";
};
