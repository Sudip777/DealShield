namespace Contracts;

public record CreateUserRequest
    (
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Password);

public record CreateConsumerRequest
    (
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Password,
    int LowCostPref,
    int TrustPref);
