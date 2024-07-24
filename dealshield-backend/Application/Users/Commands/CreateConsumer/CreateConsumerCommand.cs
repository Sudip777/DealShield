using Application.Common.Errors;
using Application.Users.Query.LoginConsumer;
using MediatR;
using OneOf;

namespace Application.Users.Commands.CreateConsumer;

public record CreateConsumerCommand(string FirstName, string LastName, string Email, string Password, string Phone, int LowCostPref, int TrustPref) : IRequest<OneOf<ConsumerResponse, IServiceError, ValidationErrors>>;
