export const mainDonation = {
  title: "Sharing Excess Donation",
  description: "Sharing Excess is a nationwide food rescue nonprofit started in Philly by a Drexel student. The produce, eggs, bread, milk, and meat products PanPan donates get picked up and redistributed to free community giveaways on the same day. Your donations will allow PanPan to purchase high quality food from our local suppliers to be given away to the community!",
  donationOptions: [
    { label: "No donation", value: 0 },
    { label: "$1", value: 1 },
    { label: "$2", value: 2 },
    { label: "$5", value: 5 },
  ]
}

export const endofyearDonation = {
  title: "End of Year Tip Jar for PanPan Staff",
  description: "All tips are divided amongst PanPan staff. We don't normally accept tips for the rest of the year. If you've enjoyed the service and work of our staff this year, consider leaving them a tip!",
  donationOptions: [
    { label: "No Tip", value: 0 },
    { label: "$1", value: 1 },
    { label: "$2", value: 2 },
    { label: "$5", value: 5 },
  ],
  upperBound: 1000,
}
