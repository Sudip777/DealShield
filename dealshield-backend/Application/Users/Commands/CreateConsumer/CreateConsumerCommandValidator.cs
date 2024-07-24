using FluentValidation;

namespace Application.Users.Commands.CreateConsumer;

public class CreateConsumerCommandValidator : AbstractValidator<CreateConsumerCommand>
{
    public CreateConsumerCommandValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty();
        RuleFor(x => x.LastName).NotEmpty();
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).MinimumLength(8);
        RuleFor(x => x.Phone).Length(10);
        RuleFor(x => x.LowCostPref).InclusiveBetween(0, 100);
        RuleFor(x => x.TrustPref).InclusiveBetween(0, 100);
    }
}
