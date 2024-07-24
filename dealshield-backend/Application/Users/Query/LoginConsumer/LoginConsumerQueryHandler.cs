using Application.Common.Errors;
using Application.Common.Services;
using Domain.User;
using MediatR;
using OneOf;

namespace Application.Users.Query.LoginConsumer;

public class LoginConsumerQueryHandler : IRequestHandler<LoginConsumerQuery, OneOf<ConsumerResponse, IServiceError, ValidationErrors>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJwtGenerator _jwtGenerator;

    public LoginConsumerQueryHandler(IUnitOfWork unitOfWork, IJwtGenerator jwtGenerator)
    {
        _unitOfWork = unitOfWork;
        _jwtGenerator = jwtGenerator;
    }

    public async Task<OneOf<ConsumerResponse, IServiceError, ValidationErrors>> Handle(LoginConsumerQuery request, CancellationToken cancellationToken)
    {
        var consumer = await _unitOfWork.ConsumerRepository.GetByEmail(request.Email);
        if (consumer.Equals(Consumer.Empty))
            return new InvalidCredentialsError();

        //Verify password
        bool passwordCorrect = BCrypt.Net.BCrypt.Verify(request.Password, consumer.Password);

        if (!passwordCorrect)
            return new InvalidCredentialsError();

        //Generate token
        var token = _jwtGenerator.GenerateJwt(consumer);

        //Generate user response
        var userResponse = new ConsumerResponse(consumer.Id.Value, consumer.FirstName, consumer.LastName, consumer.Email, consumer.MobileNo, consumer.UserType.ToString(), consumer.lowCostPreference, consumer.trustPref, token);

        return userResponse;

    }
}

public record ConsumerResponse(Guid id, string FirstName, string LastName, string Email, string Phone, string UserType, int LowCostPref, int TrustPref, string Token);