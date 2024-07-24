using Application.Common.Algo;
using Application.Common.Services;
using Domain.Bids;
using Domain.User;

namespace Infrastructure.Algo;
public class WeightedScoringAlgo(IUnitOfWork uow) : IWeightedScoringAlgo
{

    public async Task<Bid> GetRecommendedBid(IReadOnlyList<Bid> bids, Consumer consumer)
    {
        if (!bids.Any()) return Bid.Empty;
        var providerIds = bids.Select(b => b.BidderId).ToList();


        //Get list of provider
        var providerList = await uow.ProviderRepository.GetAllByIdAsync(providerIds);

        //maximum and minimum bid amount
        double maxBidAmount = bids.MaxBy(b => b.ProposedAmount).ProposedAmount;
        double minBidAmount = bids.MinBy(b => b.ProposedAmount).ProposedAmount;

        //Get the maximum and minimum provider age
        var maxProviderAge = (DateTime.Now - providerList.MinBy(p => p.CreatedDate)!.CreatedDate).Days;
        var minProviderAge = (DateTime.Now - providerList.MaxBy(p => p.CreatedDate)!.CreatedDate)!.Days;

        var bidWithScore = bids.Select(b =>
        {
            Console.WriteLine("Calulcation of " + b.Id.Value);
            double normalizedCost = 0;
            double normalizedAge = 0;

            var providerForTheBid = providerList.Single(p => b.BidderId == p.Id);
            var providerAge = (DateTime.Now - providerForTheBid.CreatedDate).Days;

            //Calculate normalized values

            normalizedCost = maxBidAmount == minBidAmount ? 1 : (maxBidAmount - b.ProposedAmount) / (maxBidAmount - minBidAmount);


            normalizedAge = maxProviderAge == minProviderAge ? 1 : (providerAge - minProviderAge) / (maxProviderAge - minProviderAge);
            var normalizedRating = (providerForTheBid.AvgRating) / 10;

            double costScore = (normalizedCost * (consumer.lowCostPreference));
            var trustScore = ((normalizedAge + normalizedRating) / 2) * consumer.trustPref;


            var final_score = costScore + trustScore;


            Console.WriteLine($"{b.ProposedAmount}: {final_score}");

            return new BidWithScore(b, final_score);
        });



        return bidWithScore.MaxBy(bws => bws.Score)!.Bid; ;
    }
}

internal record BidWithScore(Bid Bid, double Score);

